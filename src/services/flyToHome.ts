import { viewer } from "./displayMap";
import * as Cesium from 'cesium';
import startConfig from '../data/startConfig.json';
import { map } from "./olMap";

export const flyToHome = (mapType: string) => {
    if (mapType === '3d'){
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
    } else if (mapType === '2d'){
        map.getView().animate({
            center: [startConfig.camera.defaultPosition.longitude, startConfig.camera.defaultPosition.latitude+0.01],
            zoom: 14,
            duration: 1000
        })
    }
}