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

export const registerGoogleMapsStandard = async (isEnabled: boolean) => {
    switch(isEnabled){
        case true:
            viewer?.imageryLayers.removeAll()
            viewer?.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
                url: 'https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}&hl={pl}',
                maximumLevel: 22,
                credit: new Cesium.Credit('Map data &copy;2025 Google'),
            }))

    }
}

export const registerEsriWorldTopoMap = async (isEnabled: boolean) => {
    switch(isEnabled){
        case true:
            viewer?.imageryLayers.removeAll()
            viewer?.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
                url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}&hl={pl}',
                credit: new Cesium.Credit('Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'),
                maximumLevel: 22,
            }))
            break;
    }
}

export const changeBasemap = async (basemap: string) => {
    switch(basemap){
        case 'osm':
            registerOSMBasemap(true);
            break;
        case 'ortho':
            registerOrtoBasemap(true);
            break;
        case 'google':
            registerGoogleMapsStandard(true);
            break;
        case 'esri':
            registerEsriWorldTopoMap(true);
            break;
    }
}