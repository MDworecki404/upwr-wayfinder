import * as Cesium from 'cesium';
import { viewer } from './displayMap';
import { upwrBuildingsDataSource } from './layers';

export const flyToBuilding = (building: string) => {
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
}
