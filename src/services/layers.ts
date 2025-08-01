import { viewer } from "./displayMap";
import * as Cesium from 'cesium';
import { updatePopUpData } from './popUpStates';
import upwrBuildingsResource from '../layers2d/upwrBuildingsWithAddresses.json'


let google3dtiles: Cesium.Cesium3DTileset | null = null;

export const loadGoogle3DTiles = async () => {
    google3dtiles = await Cesium.Cesium3DTileset.fromIonAssetId(2275207);
    viewer?.scene.primitives.add(google3dtiles);
    google3dtiles.show = false
}

export const register3DGoogleTiles = async (isEnabled: boolean) => {
    switch(isEnabled){
        case true:
            google3dtiles!.show = true
            break;
        case false:
            google3dtiles!.show = false
            break
    }
}

let osm3dtiles: Cesium.Cesium3DTileset | null = null;

export const loadOSM3DTiles = async () => {
    osm3dtiles = await Cesium.Cesium3DTileset.fromIonAssetId(96188);
    viewer?.scene.primitives.add(osm3dtiles);
    osm3dtiles.show = false
}

export const register3DOSM3DTiles = async (isEnabled: boolean) => {
    switch(isEnabled){
        case true:
            osm3dtiles!.show = true
            break;
        case false:
            osm3dtiles!.show = false
            break
    }
}

let lod1buildings: Cesium.Cesium3DTileset | null = null;

export const loadLod1Buildings = async () => {
    lod1buildings = await Cesium.Cesium3DTileset.fromIonAssetId(3294785);
    viewer?.scene.primitives.add(lod1buildings);
    lod1buildings.show = false
    const boundingSphere = lod1buildings.boundingSphere;
    const cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center)
    // Pobierz wysokość terenu
    const terrainSample = await Cesium.sampleTerrainMostDetailed(viewer?.terrainProvider as Cesium.TerrainProvider, [cartographic]);
    const terrainHeight = terrainSample[0].height;
    console.log(terrainHeight)
    // Oblicz przesunięcie
    const surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
    const offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 40.5)
    // Zastosuj transformację
    const translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
    lod1buildings.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
    lod1buildings.shadows = Cesium.ShadowMode.ENABLED
    const handler = new Cesium.ScreenSpaceEventHandler(viewer?.canvas);
    handler.setInputAction(function (click: any) {
        const picked = viewer?.scene.pick(click.position);
        if (Cesium.defined(picked) && picked.primitive === lod1buildings && picked instanceof Cesium.Cesium3DTileFeature){
            console.log(picked.getProperty('gml_id'));
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

export const registerLod1Buildings = async (isEnabled: boolean) => {
    switch(isEnabled){
        case true:
            lod1buildings!.show = true
            break;
        case false:
            lod1buildings!.show = false
            break;
    }
}

let upwrBuildingsDataSource: Cesium.GeoJsonDataSource | null = null;

Cesium.GeoJsonDataSource.clampToGround = true;

export const loadUpwrBuildings = async () => {
    const resource = upwrBuildingsResource;
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
    viewer?.dataSources.add(upwrBuildingsDataSource);
    upwrBuildingsDataSource.show = false;
}

export const registerUpwrBuildings = async (isEnabled: boolean, showPopUp?: () => void) => {
    switch(isEnabled){
        case true:
            upwrBuildingsDataSource!.show = true;
            const handler = new Cesium.ScreenSpaceEventHandler(viewer?.canvas);
            handler.setInputAction(function (click: any) {
                upwrBuildingsDataSource?.entities.values.forEach(entity => {
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

                    // Highlight the clicked building with a bright yellow color
                    pickedObject.id.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.RED.withAlpha(0.5));

                    // Restore original material after 1 second

                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
            break;
        case false:
            upwrBuildingsDataSource!.show = false;
            break;
    }
}

let demWroclaw: Cesium.CesiumTerrainProvider | null = null;

export const registerDemWroclaw = async (isEnabled: boolean) => {
    switch(isEnabled){
        case true:
            demWroclaw = await Cesium.CesiumTerrainProvider.fromIonAssetId(3554754) as Cesium.CesiumTerrainProvider;
            viewer?.scene.setTerrain(
                new Cesium.Terrain(
                    Cesium.CesiumTerrainProvider.fromIonAssetId(3554754)
                )
            )
            break;
        case false:
            viewer?.scene.setTerrain(Cesium.Terrain.fromWorldTerrain(),)
            demWroclaw = null;
    }
}

export const prepareLayers = async () => {
    await loadGoogle3DTiles()
    await loadOSM3DTiles()
    await loadLod1Buildings()
    await loadUpwrBuildings()
}


export {google3dtiles, osm3dtiles, lod1buildings, upwrBuildingsDataSource, demWroclaw}