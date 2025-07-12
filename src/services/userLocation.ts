import { viewer } from "./displayMap";
import * as Cesium from "cesium";
import { Feature, Geolocation } from "ol";
import { map } from "./olMap";
import { Point } from "ol/geom";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Icon, Circle as CircleStyle, Fill, Stroke } from "ol/style";

// Tymczasowa ikona użytkownika - możesz zastąpić własną ikoną
const userIconPNG = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyQzIgMTcuNTIgNi40OCAyMiAxMiAyMkMxNy41MiAyMiAyMiAxNy41MiAyMiAxMkMyMiA2LjQ4IDE3LjUyIDIgMTIgMloiIGZpbGw9IiM0Q0FGNTAiLz4KPHBhdGggZD0iTTEyIDZDMTAuMzQgNiA5IDcuMzQgOSA5QzkgMTAuNjYgMTAuMzQgMTIgMTIgMTJDMTMuNjYgMTIgMTUgMTAuNjYgMTUgOUMxNSA3LjM0IDEzLjY2IDYgMTIgNloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMiAxNEM5LjMzIDE0IDcgMTYuMzMgNyAxOVYyMEgxN1YxOUMxNyAxNi4zMyAxNC42NyAxNCAxMiAxNFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=';

// Alternatywna ikona jako prosty kółko
const simpleUserIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiM0Q0FGNTAiLz4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNCIgZmlsbD0id2hpdGUiLz4KPC9zdmc+';


let watchId: number | null = null;
let userEntity: Cesium.Entity | null = null; // <- zapamiętujemy encję poza funkcją
let tracking = false
let userFeature: Feature | null = null;
let userLayer: VectorLayer<VectorSource> | null = null;
let olGeolocation: Geolocation | null = null;

export const stopTracking = (mapType: string) => {
    
    if (mapType === '3d') {
        if (watchId !== null) {
            navigator.geolocation.clearWatch(watchId);
            watchId = null;
        }
        if (userEntity) {
            viewer!.entities.remove(userEntity);
            userEntity = null;
        }
        tracking = false;
    }
    if (mapType === '2d') {
        if (olGeolocation) {
            olGeolocation.setTracking(false);
            olGeolocation = null;
        }
        if (userLayer) {
            map.removeLayer(userLayer);
            userLayer = null;
            userFeature = null;
        }
        tracking = false;
    }
};

export const userPositionFollow = (mapType: string) => {
    
    if (tracking === true){
        stopTracking(mapType)
    } else {
        tracking = true
        
        if (mapType === '3d') {
            // 3D Cesium implementation
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
        } else if (mapType === '2d') {
            // 2D OpenLayers implementation
            if (!map) {
                return;
            }
            
            if (!map.getTarget()) {
                return;
            }
            
            // Create user location feature
            userFeature = new Feature({
                geometry: new Point([0, 0])
            });

            // Create style for user location
            const userStyle = new Style({
                image: new Icon({
                    src: simpleUserIcon,
                    scale: 2, // Zwiększamy rozmiar ikony
                    anchor: [0.5, 0.5]
                })
            });

            userFeature.setStyle(userStyle);
            
            // Alternatywny styl jako kółko dla testów
            const circleStyle = new Style({
                image: new CircleStyle({
                    radius: 10,
                    fill: new Fill({
                        color: '#4CAF50'
                    }),
                    stroke: new Stroke({
                        color: 'white',
                        width: 2
                    })
                })
            });
            
            // Użyj stylu kółka zamiast ikony
            userFeature.setStyle(circleStyle);

            // Create vector source and layer
            const userSource = new VectorSource({
                features: [userFeature]
            });

            userLayer = new VectorLayer({
                source: userSource,
                zIndex: 1000 // Ensure user location is on top
            });

            // Add layer to map
            map.addLayer(userLayer);

            // Create OpenLayers Geolocation
            olGeolocation = new Geolocation({
                trackingOptions: {
                    enableHighAccuracy: true,
                    maximumAge: 100,
                    timeout: 10000
                },
                projection: 'EPSG:4326' // Używamy projekcji geograficznej
            });

            // Set up geolocation tracking
            olGeolocation.setTracking(true);

            // Handle position updates
            olGeolocation.on('change:position', () => {
                const coordinates = olGeolocation!.getPosition();
                
                if (coordinates && userFeature) {
                    const geometry = userFeature.getGeometry() as Point;
                    if (geometry) {
                        geometry.setCoordinates(coordinates);
                        // Sprawdź czy punkt jest w widoku map
                    }
                }
            });

            // Handle tracking state changes
            olGeolocation.on('change:tracking', () => {
                if (olGeolocation!.getTracking()) {
                    const coordinates = olGeolocation!.getPosition();
                    if (coordinates) {
                        map.getView().animate({
                            center: coordinates,
                            zoom: 18,
                            duration: 1000
                        });
                    }
                }
            });

            // Handle geolocation errors
            olGeolocation.on('error', (error) => {
                console.error("Błąd lokalizacji:", error);
            });
        }
    }
};

