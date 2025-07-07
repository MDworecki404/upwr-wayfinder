import { viewer } from '../displayMap';
import * as Cesium from 'cesium'
import BuildingData from '../../data/universityBuildings.json'
import { stopTracking } from '../userLocation';
import gsap from "gsap";
import { upwrBuildingsDataSource } from '../layers';

// Zmienna do śledzenia aktywnego workera
let activeWorker: Worker | null = null;

const loadingIconSVG = document.querySelector('.loading-icon') as HTMLElement;

const routeFinder = async (startChoice: string, endChoice: string, selectedMode: string) => {
    stopTracking();
    gsap.to('#routeClear', {opacity: 0, visibility: 'hidden', pointerEvents: 'none', duration: 0.2})
    console.log("Rozpoczęcie wyszukiwania trasy:", Date.now());
    
    // Anuluj poprzedniego workera jeśli istnieje
    if (activeWorker) {
        activeWorker.terminate();
        activeWorker = null;
    }
    
    viewer!.entities.removeAll();

    gsap.to(loadingIconSVG, {visibility: 'visible', opacity: 1, duration: 0.5});

    // Sprawdzenie czy wybrano budynki
    if (!startChoice || !endChoice) {
        console.error("Nie wybrano budynków");
        gsap.to(loadingIconSVG, {opacity: 0, duration: 0.5});
        gsap.to(loadingIconSVG, {visibility: 'hidden', delay: 0.5});
        alert("Wybierz budynki początkowy i docelowy");
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
        gsap.to(loadingIconSVG, {opacity: 0, duration: 0.5});
        gsap.to(loadingIconSVG, {visibility: 'hidden', delay: 0.5});
        alert("Nie znaleziono wybranych budynków. Spróbuj ponownie wybrać budynki.");
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
                gsap.to(loadingIconSVG, {opacity: 0, duration: 0.5});
                gsap.to(loadingIconSVG, {visibility: 'hidden', delay: 0.5});
                alert("Obliczanie trasy zajęło zbyt dużo czasu. Spróbuj ponownie.");
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
                gsap.to(loadingIconSVG, {opacity: 0, duration: 0.5});
                gsap.to(loadingIconSVG, {visibility: 'hidden', delay: 0.5});
                alert("Nie udało się znaleźć trasy. Spróbuj z innymi budynkami lub rodzajem transportu.");
                activeWorker!.terminate();
                activeWorker = null;
                return;
            }

            // Dodaj trasę
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
                    endBuildingEntity.polygon!.material = Cesium.Color.RED.withAlpha(0.5);
                }
                if(startBuildingEntity) {
                    // @ts-expect-error
                    startBuildingEntity.polygon!.material = Cesium.Color.GREEN.withAlpha(0.5);
                }
            }

            // Dodaj marker końcowy

            // Ukryj ikonę ładowania
            gsap.to('#routeClear', {opacity: 1, visibility: 'visible', pointerEvents: 'auto', duration: 0.2})
            gsap.to(loadingIconSVG, {opacity: 0, duration: 0.5});
            gsap.to(loadingIconSVG, {visibility: 'hidden', delay: 0.5});
            // Zakończ workera
            activeWorker!.terminate();
            activeWorker = null;
        };

        // Obsługa błędów workera
        activeWorker.onerror = function(error: ErrorEvent) {
            clearTimeout(workerTimeout);
            console.error("Błąd workera:", error);
            gsap.to(loadingIconSVG, {opacity: 0, duration: 0.5});
            gsap.to(loadingIconSVG, {visibility: 'hidden', delay: 0.5});
            alert("Wystąpił błąd podczas wyszukiwania trasy. Spróbuj ponownie.");
            activeWorker!.terminate();
            activeWorker = null;
        };
    } catch (error) {
        console.error("Błąd podczas wyszukiwania trasy:", error);
        gsap.to(loadingIconSVG, {opacity: 0, duration: 0.5});
        gsap.to(loadingIconSVG, {visibility: 'hidden', delay: 0.5});
        alert("Wystąpił nieoczekiwany błąd. Spróbuj ponownie.");
    }
};

export default routeFinder;