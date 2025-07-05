import { viewer } from "./displayMap";
import * as Cesium from 'cesium';

export const registerOSMBasemap = async (isEnabled: boolean) => {
    switch(isEnabled){
        case true:
            viewer?.imageryLayers.removeAll()
            viewer?.imageryLayers.addImageryProvider(
                new Cesium.OpenStreetMapImageryProvider({
                url: 'https://a.tile.openstreetmap.org/'
                }));
            break;
    }
}

export const registerOrtoBasemap = async (isEnabled: boolean) => {
    switch(isEnabled){
        case true:
            viewer?.imageryLayers.removeAll()
            viewer?.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
                url: 'https://mapy.geoportal.gov.pl/wss/service/PZGIK/ORTO/WMTS/StandardResolution',
                layer: 'ORTOFOTOMAPA',
                style: 'default',
                tileMatrixSetID: 'EPSG:3857',
                maximumLevel: 22,
                credit: new Cesium.Credit('PZGIK'),
                minimumLevel: 0,
                tileWidth: 256,
                tileHeight: 256,
            })
    )}
}

export const changeBasemap = async (basemap: string) => {
    switch(basemap){
        case 'osm':
            registerOSMBasemap(true);
            break;
        case 'ortho':
            registerOrtoBasemap(true);
            break;
    }
}