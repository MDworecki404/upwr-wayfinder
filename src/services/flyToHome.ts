import { viewer } from "./displayMap";
import * as Cesium from 'cesium';
import startConfig from '../data/startConfig.json';

export const flyToHome = () => {
    viewer?.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
            startConfig.camera.defaultPosition.longitude,
            startConfig.camera.defaultPosition.latitude,
            startConfig.camera.defaultPosition.height
        ),
        orientation: {
            heading: Cesium.Math.toRadians(startConfig.camera.defaultHeading),
            pitch: Cesium.Math.toRadians(startConfig.camera.defaultPitch),
            roll: Cesium.Math.toRadians(startConfig.camera.defaultRoll)
        },
        duration: 1
    })
}