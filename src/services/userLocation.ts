import { viewer } from "./displayMap";
import * as Cesium from "cesium";

// Tymczasowa ikona użytkownika - możesz zastąpić własną ikoną
const userIconPNG = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyQzIgMTcuNTIgNi40OCAyMiAxMiAyMkMxNy41MiAyMiAyMiAxNy41MiAyMiAxMkMyMiA2LjQ4IDE3LjUyIDIgMTIgMloiIGZpbGw9IiM0Q0FGNTAiLz4KPHBhdGggZD0iTTEyIDZDMTAuMzQgNiA5IDcuMzQgOSA5QzkgMTAuNjYgMTAuMzQgMTIgMTIgMTJDMTMuNjYgMTIgMTUgMTAuNjYgMTUgOUMxNSA3LjM0IDEzLjY2IDYgMTIgNloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMiAxNEM5LjMzIDE0IDcgMTYuMzMgNyAxOVYyMEgxN1YxOUMxNyAxNi4zMyAxNC42NyAxNCAxMiAxNFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=';


let watchId: number | null = null;
let userEntity: Cesium.Entity | null = null; // <- zapamiętujemy encję poza funkcją
let tracking = false

export const stopTracking = () => {
    if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
        if (userEntity) {
            viewer!.entities.remove(userEntity);
            userEntity = null;
        }
        tracking = false
    }
};

export const userPositionFollow = () => {
    
    if (tracking == true){
        stopTracking()
    } else {
    tracking = true
  // Tworzymy ikonkę i encję


    userEntity = viewer!.entities.add({
        name: "Moja lokalizacja",
        position: Cesium.Cartesian3.fromDegrees(0, 0),
        billboard: {
            image: userIconPNG,
            width: 24,
            height: 24,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        }
    });
    let hasSetInitialView = false; // dodaj poza funkcją

    watchId = navigator.geolocation.watchPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const alt = position.coords.altitude || 0;

        const height = 1000;
        const destination = Cesium.Cartesian3.fromDegrees(lon, lat, height);

        if (userEntity) {
            userEntity.position = Cesium.Cartesian3.fromDegrees(lon, lat, alt) as unknown as Cesium.PositionProperty;
        }

        if (!hasSetInitialView) {
            viewer!.camera.setView({
                destination: destination,
                orientation: {
                    heading: 0.0,
                    pitch: -Math.PI / 2,
                    roll: 0.0
                }
            });
            hasSetInitialView = true; // ustawiamy flagę, żeby już nie wykonywało się ponownie
        }
        },
            (error) => {
            console.error("Błąd lokalizacji:", error.message);
        },
        {
            enableHighAccuracy: true,
            maximumAge: 100,
            timeout: 10000
        }
    );
}
};

