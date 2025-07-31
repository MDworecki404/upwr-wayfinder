import * as Cesium from 'cesium';
import startConfig from '../data/startConfig.json';
import { prepareLayers } from './layers';

let viewer: Cesium.Viewer | null = null;

const cesiumIonApiKey = import.meta.env.VITE_CESIUM_API_KEY;
Cesium.Ion.defaultAccessToken = cesiumIonApiKey;

export function displayMap(containerId: string): void {
    viewer = new Cesium.Viewer(containerId, {
        terrain: Cesium.Terrain.fromWorldTerrain(),
        animation: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        vrButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        navigationInstructionsInitiallyVisible: false,
        shouldAnimate: false,
        baseLayer: new Cesium.ImageryLayer(new Cesium.OpenStreetMapImageryProvider({
            url: 'https://a.tile.openstreetmap.org/'
        }))
    });

    viewer.shadows = true;
    viewer.scene.shadowMap.enabled = true;
    viewer.scene.shadowMap.darkness = 0.5;
    viewer.scene.sun.show = true;
    viewer.scene.skyBox.show = true;
    viewer.scene.skyAtmosphere.show = true;
    viewer.scene.globe.enableLighting = true;
    viewer.clock.currentTime = Cesium.JulianDate.fromDate(new Date(Date.UTC(2025, 6, 1, 12, 0, 0)));


    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
            startConfig.camera.defaultPosition.longitude,
            startConfig.camera.defaultPosition.latitude,
            startConfig.camera.defaultPosition.height
        ),
        orientation: {
            heading: Cesium.Math.toRadians(startConfig.camera.defaultHeading),
            pitch: Cesium.Math.toRadians(startConfig.camera.defaultPitch),
            roll: Cesium.Math.toRadians(startConfig.camera.defaultRoll)
        }
    })

    function updateImageryBrightness() {
        // @ts-expect-error
        const imageryLayer = viewer.imageryLayers.get(0);
        if (!viewer) return;
        const date = Cesium.JulianDate.toDate(viewer.clock.currentTime);
        const hour = date.getHours() + date.getMinutes() / 60;

        let brightness = 1;

        if (hour >= 6 && hour < 18) {
            brightness = 1;
        } else if (hour >= 18 && hour < 20) {
            brightness = 1 - ((hour - 18) / 2) * 0.7;
        } else if (hour >= 20 || hour < 4) {
            brightness = 0.3;
        } else if (hour >= 4 && hour < 6) {
            brightness = 0.3 + ((hour - 4) / 2) * 0.7;
        }

        imageryLayer.brightness = brightness;


    }
    viewer.clock.onTick.addEventListener(updateImageryBrightness);
    prepareLayers()
    
}

export { viewer };