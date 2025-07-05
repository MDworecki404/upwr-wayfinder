import { viewer } from "../displayMap";
import * as Cesium from 'cesium'
import BuildingData from '../../data/universityBuildings.json'
import { stopTracking, userPositionFollow } from "../userLocation";

// Zmienna do śledzenia aktywnego workera
let activeWorker: Worker | null = null;

const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
        // Wymuś świeżą lokalizację przez opcje
        const options = {
            enableHighAccuracy: true,
            maximumAge: 0,    // Ważne: nie używaj buforowanych danych
            timeout: 10000    // Timeout po 10 sekundach
        };
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    }); 
}

const userRouteFinder = async (endChoice: string, selectedMode: string) => {

    stopTracking();

    console.log("Rozpoczęcie wyszukiwania trasy:", Date.now());
    
    // Anuluj poprzedniego workera jeśli istnieje
    if (activeWorker) {
        activeWorker.terminate();   
        activeWorker = null;
    }
    
    viewer!.entities.removeAll();
    

    let startNode = [];
    try {
        const position = await getCurrentPosition() as GeolocationPosition;
        startNode = [position.coords.longitude, position.coords.latitude];
        console.log('Pobrano pozycję startową:', startNode);
    } catch (error) {
        console.error("Nie udało się pobrać lokalizacji:", error);
        // Ukryj animację ładowania w przypadku błędu
        alert("Nie udało się pobrać lokalizacji. Sprawdź uprawnienia lub spróbuj ponownie.");
        return;
    }
    
    if (!endChoice) {
        console.error("Nie wybrano budynku docelowego");
        alert("Wybierz budynek docelowy");
        return;
    }
    
    let endNode;
    for (let building of BuildingData.buildings) {
        if (building.code === endChoice) {
            endNode = building.node;
            break; // Dodaj break po znalezieniu, dla optymalizacji
        }
    }

    if (!endNode) {
        console.error("Nie znaleziono budynku o podanym kodzie:", endChoice);
        alert("Nie znaleziono wybranego budynku");
        return;
    }

    try {
        // Ładujemy dane sieci drogowej

        // Tworzymy nowego workera
        activeWorker = new Worker(new URL('./pathWorker.ts', import.meta.url), { type: 'module' });

        // Ustawiamy timeout - jeśli worker nie odpowie w 30 sekund, przerywamy
        const workerTimeout = setTimeout(() => {
            if (activeWorker) {
                console.warn("Worker timeout - przerywanie");
                activeWorker.terminate();
                activeWorker = null;
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
                alert("Nie udało się znaleźć trasy. Spróbuj z innym budynkiem lub rodzajem transportu.");
                return;
            }

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
                    clampToGround: true,
                }
            });

            
            // Wyśrodkuj widok na trasie
            
            // Zakończ workera
            activeWorker!.terminate();
            activeWorker = null;
        };

        // Obsługa błędów workera
        activeWorker.onerror = function(error: ErrorEvent) {
            clearTimeout(workerTimeout);
            console.error("Błąd workera:", error);
            alert("Wystąpił błąd podczas wyszukiwania trasy. Spróbuj ponownie.");
            activeWorker!.terminate();
            activeWorker = null;
        };
    } catch (error) {
        console.error("Błąd podczas wyszukiwania trasy:", error);
        alert("Wystąpił nieoczekiwany błąd. Spróbuj ponownie.");
    }
    userPositionFollow()
};

export {userRouteFinder};