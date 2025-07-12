import * as Cesium from 'cesium';
import { viewer } from './displayMap';
import { upwrBuildingsDataSource } from './layers';
import { map } from './olMap';
import { upwrBuildingsLayer2D } from './olLayers';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

export const flyToBuilding = (building: string, mapType: string) => {
    if (mapType === '3d') {
        const buildingEntity = upwrBuildingsDataSource?.entities.values.find(
            (entity: any) => entity._properties.A._value === building
        );

        if (buildingEntity) {
            viewer?.zoomTo(buildingEntity, new Cesium.HeadingPitchRange(0, -0.5, 300));
            const buildingColor = buildingEntity?.polygon?.material;
            // @ts-expect-error
            buildingEntity.polygon!.material = Cesium.Color.RED.withAlpha(0.5);
            setTimeout(() => {
                buildingEntity.polygon!.material = buildingColor!;
            }, 2000);
        }
    } else if (mapType === '2d') {
        const features = upwrBuildingsLayer2D.getSource()?.getFeatures();
        const buildingFeature = features?.find(
            (f: any) => f.get('A') === building
        )
        if (buildingFeature) {
            const extent = buildingFeature.getGeometry().getExtent();
            map.getView().fit(extent, {
                duration: 1000,
                padding: [50, 50, 50, 50],
                maxZoom: 18
            });
            const originalStyle = buildingFeature.getStyle();
            buildingFeature.setStyle(
                new Style({
                    fill: new Fill({
                        color: 'rgba(255,0,0,0.5)'
                    }),
                    stroke: new Stroke({
                        color: '#ff0000',
                        width: 2
                    }) 
                })
            )
            setTimeout(() => {
                buildingFeature.setStyle(originalStyle);
            }, 3000);

        }
    }
}
