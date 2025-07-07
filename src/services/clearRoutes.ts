import { viewer } from "./displayMap";
import gsap from "gsap";
import { stopTracking } from "./userLocation";
import { upwrBuildingsDataSource } from "./layers";
import * as Cesium from 'cesium';

const clearRoutes = () => {
    viewer!.entities.removeAll();
    stopTracking()
    gsap.to('#routeClear', {opacity: 0, pointerEvents: 'none', visibility: 'hidden', duration: 0.2});
    

    
    upwrBuildingsDataSource?.entities.values.forEach(entity => {
        entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(255, 255, 255, 255));
        entity.polygon!.outline = new Cesium.ConstantProperty(false);
        const id = entity.properties?.A._value;
        if (typeof id === 'string') {
            if (id.startsWith('A')) {
                entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(135, 70, 36, 255));
            } else if (id.startsWith('B')) {
                entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(131, 105, 30, 255));
            } else if (id.startsWith('C')) {
                entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(108, 140, 58, 255));
            } else if (id.startsWith('D')) {
                entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(52, 171, 116, 255));
            } else if (id.startsWith('E')) {
                entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(0, 199, 193, 255));
            } else if (id.startsWith('F')) {
                entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(71, 64, 99, 255));
            }
        }
    });
    
}

export {clearRoutes}