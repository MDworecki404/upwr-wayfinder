import * as Cesium from 'cesium'


import { viewer } from './displayMap'

import {lod1buildings, upwrBuildingsDataSource } from './layers';
import { upwrBuildingsLayer2D } from './olLayers';
import { map } from './olMap';

const zoomTo = (entity: string, mapType: string) => {         
    switch(entity){
        case 'lod1buildings':
            if(lod1buildings){
                viewer?.camera.flyTo({
                    destination: Cesium.Cartesian3.fromRadians(17.026377945456957*Math.PI/180, 51.0859535257346*Math.PI/180, 2400.2296524386547),
                    orientation: {
                        heading: 33.04896713576276*Math.PI/180,
                        pitch: -39.683620410669114*Math.PI/180,
                        roll: 0.005388234304626005*Math.PI/180
                    },
                    duration: 1
                })
            }
            break;
        case 'upwrBuildingsDataSource':
            if(mapType === '3d'){
                if(upwrBuildingsDataSource){
                    viewer?.camera.flyTo({
                        destination: Cesium.Cartesian3.fromRadians(17.077919474160037*Math.PI/180, 51.08271347054283*Math.PI/180, 2399.3896360433782),
                        orientation: {
                            heading: 0.7410473729223745*Math.PI/180,
                            pitch: -41.75127005799727*Math.PI/180,
                            roll: 359.9911063897071*Math.PI/180
                        },
                        duration: 1
                    })
                }
            } else if(mapType === '2d'){
                if(upwrBuildingsLayer2D){
                    const extent = upwrBuildingsLayer2D.getSource()?.getExtent();
                    map.getView().fit(extent!, {
                        duration: 1000,
                    });
                }
            }
            break;
    }
}

export { zoomTo }