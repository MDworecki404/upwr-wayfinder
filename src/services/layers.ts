import { viewer } from "./displayMap";
import * as Cesium from 'cesium';
import { updatePopUpData } from './popUpStates';
import cityGMLId from '../data/zlaczone_citygmlID.json'


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
            lod1buildings.shadows = Cesium.ShadowMode.ENABLED;

            const handler = new Cesium.ScreenSpaceEventHandler(viewer?.canvas);
            handler.setInputAction(function (click: any) {
                const picked = viewer?.scene.pick(click.position);
                if (Cesium.defined(picked) && picked.primitive === lod1buildings && picked instanceof Cesium.Cesium3DTileFeature){
                    console.log(picked.getProperty('gml_id'));
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
            break;
        case false:
            viewer?.scene.primitives.remove(lod1buildings);
            lod1buildings = null;
    }
}

let upwrBuildingsDataSource: Cesium.Cesium3DTileset | null = null;

Cesium.GeoJsonDataSource.clampToGround = true;



export const registerUpwrBuildings = async (isEnabled: boolean, showPopUp?: () => void) => {
    switch(isEnabled){
        case true:
            upwrBuildingsDataSource = await Cesium.Cesium3DTileset.fromIonAssetId(3294785);
            // Filtrowanie budynków po gml_id
            const allowedIds = cityGMLId.map((item: any) => item.properties.gml_id);

            const conditions: [string, string][] = [];

            cityGMLId.forEach((item: any) => {
                const gmlId = item.properties.gml_id;
                const A = item.properties.A;
              
                let color = "color('gray')";
                if (A?.startsWith('A')) color = "color('rgb(135,70,36)')";
                else if (A?.startsWith('B')) color = "color('rgb(131,105,30)')";
                else if (A?.startsWith('C')) color = "color('rgb(108,140,58)')";
                else if (A?.startsWith('D')) color = "color('rgb(52,171,116)')";
                else if (A?.startsWith('E')) color = "color('rgb(0,199,193)')";
                else if (A?.startsWith('F')) color = "color('rgb(71,64,99)')";
              
                conditions.push([`\${gml_id} === '${gmlId}'`, color]);
              });
            
            upwrBuildingsDataSource.style = new Cesium.Cesium3DTileStyle({
                show: {
                    conditions: [
                        [`${allowedIds.map((id: any) => `\${gml_id} === '${id}'`).join(' || ')}`, 'true'],
                        ['true', 'false']
                    ]
                },
                color: {
                    conditions: conditions
                }
            })
            viewer?.scene.primitives.add(upwrBuildingsDataSource);
            const boundingSphere = upwrBuildingsDataSource.boundingSphere;
            const cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
            const surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, -42.0);
            const offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0);
            const translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
            upwrBuildingsDataSource.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
            upwrBuildingsDataSource.shadows = Cesium.ShadowMode.ENABLED;
            break;
    }
}

export {google3dtiles, osm3dtiles, lod1buildings, upwrBuildingsDataSource}