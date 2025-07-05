import { viewer } from "./displayMap";
import * as Cesium from 'cesium';

let google3dtiles: Cesium.Cesium3DTileset | null = null;

export const register3DGoogleTiles = async (isEnabled: boolean) => {
    switch(isEnabled){
        case true:
            google3dtiles = await Cesium.Cesium3DTileset.fromIonAssetId(2275207);
            viewer?.scene.primitives.add(google3dtiles);
            break;
        case false:
            viewer?.scene.primitives.remove(google3dtiles);
            google3dtiles = null;
    }
}

let osm3dtiles: Cesium.Cesium3DTileset | null = null;

export const register3DOSM3DTiles = async (isEnabled: boolean) => {
    switch(isEnabled){
        case true:
            osm3dtiles = await Cesium.Cesium3DTileset.fromIonAssetId(96188),
            viewer?.scene.primitives.add(osm3dtiles);
            break;
        case false:
            viewer?.scene.primitives.remove(osm3dtiles);
            osm3dtiles = null;
    }
}

let lod1buildings: Cesium.Cesium3DTileset | null = null;

export const registerLod1Buildings = async (isEnabled: boolean) => {
    switch(isEnabled){
        case true:
            lod1buildings = await Cesium.Cesium3DTileset.fromIonAssetId(3294785),
            viewer?.scene.primitives.add(lod1buildings);
            const boundingSphere = lod1buildings.boundingSphere;
            const cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
            const surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, -42.0);
            const offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0);
            const translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
            lod1buildings.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
            break;
        case false:
            viewer?.scene.primitives.remove(lod1buildings);
            lod1buildings = null;
    }
}