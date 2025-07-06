import * as Cesium from 'cesium'


import { viewer } from './displayMap'
import { google3dtiles, osm3dtiles, lod1buildings, upwrBuildingsDataSource } from './layers';

const zoomTo = (entity: string) => {         
    switch(entity){
        case 'lod1buildings':
            if(lod1buildings){
                viewer?.zoomTo(lod1buildings!, new Cesium.HeadingPitchRange(0.0, -0.9))
            }
            break;
        case 'upwrBuildingsDataSource':
            if(upwrBuildingsDataSource){
                viewer?.zoomTo(upwrBuildingsDataSource!, new Cesium.HeadingPitchRange(0.0, -0.9))
            }
            break;
    }
}

export { zoomTo }