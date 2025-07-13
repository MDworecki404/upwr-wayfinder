import { viewer } from '../displayMap';
import * as Cesium from 'cesium'
import BuildingData from '../../data/universityBuildings.json'
import { stopTracking } from '../userLocation';
import gsap from "gsap";
import { upwrBuildingsDataSource } from '../layers';
import { map } from '../olMap'
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { LineString } from 'ol/geom';
import Feature from 'ol/Feature';
import { Stroke, Style } from 'ol/style';
import { clearRoutes } from '../clearRoutes';

// Zmienna do śledzenia aktywnego workera
let activeWorker: Worker | null = null;
export let routeLayer: VectorLayer | null = null;

// Funkcja do obliczania odległości ścieżki w metrach
const calculatePathDistance = (path: number[][]): number => {
    let totalDistance = 0;
    
    for (let i = 0; i < path.length - 1; i++) {
        const [lon1, lat1] = path[i];
        const [lon2, lat2] = path[i + 1];
        
        // Obliczanie odległości w metrach używając wzoru haversine
        const R = 6371000; // Promień Ziemi w metrach
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        
        totalDistance += distance;
    }
    
    return Math.round(totalDistance);
};

const routeFinder = async (startChoice: string, endChoice: string, selectedMode: string, mapType: string): Promise<number | null> => {
    return new Promise((resolve) => {
        stopTracking(mapType);
        clearRoutes(mapType);
        gsap.to('#routeClear', {opacity: 0, visibility: 'hidden', pointerEvents: 'none', duration: 0.2})
        console.log("Rozpoczęcie wyszukiwania trasy:", Date.now());
        
        // Anuluj poprzedniego workera jeśli istnieje
        if (activeWorker) {
            activeWorker.terminate();
            activeWorker = null;
        }
        
        if (mapType === '3d'){
            viewer!.entities.removeAll();
        }

        gsap.to('.loading-icon', {visibility: 'visible', opacity: 1, duration: 0.5});

        // Sprawdzenie czy wybrano budynki
        if (!startChoice || !endChoice) {
            console.error("Nie wybrano budynków");
            gsap.to('.loading-icon', {opacity: 0, duration: 0.5});
            gsap.to('.loading-icon', {visibility: 'hidden', delay: 0.5});
            alert("Wybierz budynki początkowy i docelowy");
            resolve(null);
            return;
        }

        let startNode, endNode;

        // Znajdowanie węzłów dla wybranych budynków
        for (let building of BuildingData.buildings) {
            if (building.code === startChoice) {
                startNode = building.node;
            }
            if (building.code === endChoice) {
                endNode = building.node;
            }
            // Przerwij pętlę, jeśli już znaleziono oba budynki
            if (startNode && endNode) break;
        }

        if (!startNode || !endNode) {
            console.error("Nie znaleziono wybranych budynków.");
            gsap.to('.loading-icon', {opacity: 0, duration: 0.5});
            gsap.to('.loading-icon', {visibility: 'hidden', delay: 0.5});
            alert("Nie znaleziono wybranych budynków. Spróbuj ponownie wybrać budynki.");
            resolve(null);
            return;
        } 
        
        // Pokaż animację ładowania

        try {
            // Tworzymy nowego workera
            activeWorker = new Worker(new URL('./pathWorker.ts', import.meta.url), { type: 'module' });

            // Ustawiamy timeout - jeśli worker nie odpowie w 30 sekund, przerywamy
            const workerTimeout = setTimeout(() => {
                if (activeWorker) {
                    console.warn("Worker timeout - przerywanie");
                    activeWorker!.terminate();
                    activeWorker = null;
                    gsap.to('.loading-icon', {opacity: 0, duration: 0.5});
                    gsap.to('.loading-icon', {visibility: 'hidden', delay: 0.5});
                    alert("Obliczanie trasy zajęło zbyt dużo czasu. Spróbuj ponownie.");
                    resolve(null);
                }
            }, 30000);

            // Wysyłamy dane do workera
            activeWorker.postMessage({
                start: startNode,
                goal: endNode,
                mode: selectedMode
            });

            // Reakcja na otrzymanie ścieżki z workera
            activeWorker.onmessage = function(e: MessageEvent) {
                clearTimeout(workerTimeout);
                const { path } = e.data;

                if (!path || path.length === 0) {
                    console.warn("Brak trasy.");
                    gsap.to('.loading-icon', {opacity: 0, duration: 0.5});
                    gsap.to('.loading-icon', {visibility: 'hidden', delay: 0.5});
                    alert("Nie udało się znaleźć trasy. Spróbuj z innymi budynkami lub rodzajem transportu.");
                    activeWorker!.terminate();
                    activeWorker = null;
                    resolve(null);
                    return;
                }

                // Oblicz odległość ścieżki
                const distance = calculatePathDistance(path);
                console.log(`Odległość trasy: ${distance} metrów`);

                // Dodaj trasę
                if (mapType === '3d'){
                    const positions = path.map((coord: number[]) => Cesium.Cartesian3.fromDegrees(coord[0], coord[1]));
                    viewer!.entities.add({
                        polyline: {
                            positions: positions,
                            width: 8,
                            material: new Cesium.PolylineOutlineMaterialProperty({
                                color: Cesium.Color.fromCssColorString('#42A5F5'), // Vuetify primary blue
                                outlineWidth: 2,
                                outlineColor: Cesium.Color.fromCssColorString('#0D47A1') // Darker blue outline
                            }),
                            clampToGround: true
                        }
                    });

                    if(upwrBuildingsDataSource) {
                        const endBuildingEntity = upwrBuildingsDataSource?.entities.values.find(
                            (entity: any) => entity._properties.A._value === endChoice
                        );
                        const startBuildingEntity = upwrBuildingsDataSource?.entities.values.find(
                            (entity: any) => entity._properties.A._value === startChoice
                        );
                        if(endBuildingEntity) {
                            // @ts-expect-error
                            endBuildingEntity.polygon!.material = Cesium.Color.GREEN.withAlpha(0.5);
                        }
                        if(startBuildingEntity) {
                            // @ts-expect-error
                            startBuildingEntity.polygon!.material = Cesium.Color.RED.withAlpha(0.5);
                        }
                    }
                } else if (mapType === '2d'){
                    // Dla OpenLayers używamy oryginalnych koordynatów [longitude, latitude]
                    const routeFeature = new Feature({
                        geometry: new LineString(path)
                    });
                    
                    // Styl dla linii trasy
                    const routeStyle = new Style({
                        stroke: new Stroke({
                            color: '#42A5F5', // Vuetify primary blue
                            width: 4
                        })
                    });
                    
                    routeFeature.setStyle(routeStyle);
                    routeLayer = new VectorLayer({
                        source: new VectorSource({
                            features: [routeFeature],
                        }),
                        zIndex: 100 // Upewniamy się, że trasa jest nad innymi warstwami
                    })
                    map.addLayer(routeLayer);
                }
                

                // Dodaj marker końcowy

                // Ukryj ikonę ładowania
                gsap.to('#routeClear', {opacity: 1, visibility: 'visible', pointerEvents: 'auto', duration: 0.2})
                gsap.to('.loading-icon', {opacity: 0, duration: 0.5});
                gsap.to('.loading-icon', {visibility: 'hidden', delay: 0.5});
                // Zakończ workera
                activeWorker!.terminate();
                activeWorker = null;
                
                // Zwróć odległość przez Promise
                resolve(distance);
            };

            // Obsługa błędów workera
            activeWorker.onerror = function(error: ErrorEvent) {
                clearTimeout(workerTimeout);
                console.error("Błąd workera:", error);
                gsap.to('.loading-icon', {opacity: 0, duration: 0.5});
                gsap.to('.loading-icon', {visibility: 'hidden', delay: 0.5});
                alert("Wystąpił błąd podczas wyszukiwania trasy. Spróbuj ponownie.");
                activeWorker!.terminate();
                activeWorker = null;
                resolve(null);
            };
        } catch (error) {
            console.error("Błąd podczas wyszukiwania trasy:", error);
            gsap.to('.loading-icon', {opacity: 0, duration: 0.5});
            gsap.to('.loading-icon', {visibility: 'hidden', delay: 0.5});
            alert("Wystąpił nieoczekiwany błąd. Spróbuj ponownie.");
            resolve(null);
        }
    });
};

export default routeFinder;