import { viewer } from "./displayMap";
import * as Cesium from 'cesium';
import { updatePopUpData } from './popUpStates';


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

let upwrBuildingsDataSource: Cesium.GeoJsonDataSource | null = null;

Cesium.GeoJsonDataSource.clampToGround = true;



export const registerUpwrBuildings = async (isEnabled: boolean, showPopUp?: () => void) => {
    switch(isEnabled){
        case true:
            const resource = await Cesium.IonResource.fromAssetId(3519578);
            upwrBuildingsDataSource = await Cesium.GeoJsonDataSource.load(resource);
            
            upwrBuildingsDataSource.entities.values.forEach(entity => {
                entity.polygon!.height = new Cesium.ConstantProperty(158+entity.properties?.height._value+5);
                entity.polygon!.extrudedHeight = new Cesium.ConstantProperty(158);
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
            const handler = new Cesium.ScreenSpaceEventHandler(viewer?.canvas);
            let highlightedEntity: Cesium.Entity | null = null;
            const originalColors = new Map<Cesium.Entity, Cesium.MaterialProperty>();

            handler.setInputAction(function (movement: any) {
                const pickedObject = viewer?.scene.pick(movement.endPosition);

                if (
                    Cesium.defined(pickedObject) &&
                    pickedObject?.id &&
                    upwrBuildingsDataSource?.entities.contains(pickedObject.id)
                ) {
                    const entity = pickedObject.id;

                    if (highlightedEntity !== entity) {
                        // Przywróć poprzedni podświetlony
                        if (highlightedEntity && originalColors.has(highlightedEntity)) {
                            highlightedEntity.polygon!.material = originalColors.get(highlightedEntity)!;
                        }

                        // Zapisz oryginalny kolor jeśli nie był zapisany
                        if (!originalColors.has(entity)) {
                            originalColors.set(entity, entity.polygon!.material);
                        }

                        entity.polygon!.material = Cesium.Color.SKYBLUE.withAlpha(0.8);
                        highlightedEntity = entity;
                    }
                } else {
                    // ZAWSZE przywróć kolor, jeśli nie ma budynku pod kursorem
                    if (highlightedEntity && originalColors.has(highlightedEntity)) {
                        highlightedEntity.polygon!.material = originalColors.get(highlightedEntity)!;
                        highlightedEntity = null;
                    }
                }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

            handler.setInputAction(function (click: any) {
                const pickedObject = viewer?.scene.pick(click.position);
                if (Cesium.defined(pickedObject) && pickedObject.id && upwrBuildingsDataSource?.entities.contains(pickedObject.id)) {
                    if (showPopUp) {
                        showPopUp();
                    }
                    const newTitle = 'Budynek UPWr';
                    const newDescription = `
                        Numer budynku: <b>${pickedObject.id.properties?.A._value}</b> <br>
                        Adres: <b>${pickedObject.id.properties?.B._value}</b> <br><br>
                        <b>Informacje dodatkowe:</b> <i>${pickedObject.id.properties?.desc._value}</i> <br>
                    `;
                    updatePopUpData(newTitle, newDescription);
                    
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        
            
            viewer?.dataSources.add(upwrBuildingsDataSource);
            break;
        case false:
            viewer?.dataSources.remove(upwrBuildingsDataSource!);
            upwrBuildingsDataSource = null;
            break;
    }
}

export {google3dtiles, osm3dtiles, lod1buildings, upwrBuildingsDataSource}