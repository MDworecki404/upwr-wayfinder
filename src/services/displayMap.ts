import * as Cesium from 'cesium';
import startConfig from '../data/startConfig.json';

let viewer: Cesium.Viewer | null = null;

const cesiumIonApiKey = Cesium.Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_API_KEY;

export function displayMap(containerId: string): void {
    console.log(`Using Cesium Ion API Key: ${cesiumIonApiKey}`);
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

    //viewer.scene.camera.changed.addEventListener(() => {
    //    const cameraPosition = viewer.camera.positionCartographic;
    //    console.log(`Camera Position: Longitude: ${Cesium.Math.toDegrees(cameraPosition.longitude)}, Latitude: ${Cesium.Math.toDegrees(cameraPosition.latitude)}, Height: ${cameraPosition.height}`);
    //    const cameraHeading = viewer.camera.heading;
    //    console.log(`Camera Heading: ${Cesium.Math.toDegrees(cameraHeading)} degrees`);
    //    const cameraPitch = viewer.camera.pitch;
    //    console.log(`Camera Pitch: ${Cesium.Math.toDegrees(cameraPitch)} degrees`);
    //    const cameraRoll = viewer.camera.roll;
    //    console.log(`Camera Roll: ${Cesium.Math.toDegrees(cameraRoll)} degrees`);
    //});

    
}

export { viewer };