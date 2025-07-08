import { viewer } from "../displayMap";
import * as Cesium from 'cesium';

export const checkCameraPosition = () => {
    window.console.clear()
    // @ts-expect-error
    const cameraPosition = viewer.camera.positionCartographic;
    console.log(`Camera Position: Longitude: ${Cesium.Math.toDegrees(cameraPosition.longitude)}, Latitude: ${Cesium.Math.toDegrees(cameraPosition.latitude)}, Height: ${cameraPosition.height}`);
    // @ts-expect-error
    const cameraHeading = viewer.camera.heading;
    console.log(`Camera Heading: ${Cesium.Math.toDegrees(cameraHeading)} degrees`);
    // @ts-expect-error
    const cameraPitch = viewer.camera.pitch;
    console.log(`Camera Pitch: ${Cesium.Math.toDegrees(cameraPitch)} degrees`);
    // @ts-expect-error
    const cameraRoll = viewer.camera.roll;
    console.log(`Camera Roll: ${Cesium.Math.toDegrees(cameraRoll)} degrees`);
    console.log('--------------------------------');
}