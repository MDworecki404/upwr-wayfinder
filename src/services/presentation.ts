import { viewer } from "./displayMap";
import * as Cesium from 'cesium';
import { osm3dtiles, upwrBuildingsDataSource, google3dtiles, lod1buildings, registerUpwrBuildings } from "./layers";
import { register3DGoogleTiles } from "./layers";
import { changeBasemap } from "./basemaps";
import { ref } from 'vue';

export const isDisabled = ref(false);
export const subtitles = ref('');

export const resetPresentation = () => {
    viewer?.scene.primitives.remove(google3dtiles);
    viewer?.scene.primitives.remove(osm3dtiles);
    viewer?.dataSources.removeAll();
    viewer?.scene.primitives.remove(lod1buildings);
    viewer?.entities.removeAll();
    changeBasemap('osm')
    isDisabled.value = false;
    subtitles.value = '';
}

export const playPresentation = (step: number) => {
    
    switch (step) {
        case 1:
            resetPresentation();
            register3DGoogleTiles(true);
            isDisabled.value = true;
            setTimeout(() => {
                isDisabled.value = false;
            }, 4000);
            changeBasemap('ortho')
            subtitles.value = 'Witaj w UPWr! Tutaj znajduje się gmach główny naszej uczelni.';
            viewer?.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(17.063402384360792, 51.11197437482568, 223.7431887491),
                orientation: {
                    heading: Cesium.Math.toRadians(156.277998979109),
                    pitch: Cesium.Math.toRadians(-39.334137591351364),
                    roll: Cesium.Math.toRadians(359.9999929064176)
                }
            })
            
            break;
        case 2:
            isDisabled.value = true;
            changeBasemap('esri')
            setTimeout(() => {
                isDisabled.value = false;
            }, 4000);
            viewer?.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(17.059568262544477, 51.110463139477424, 524.1358960791437),
                orientation: {
                    heading: Cesium.Math.toRadians(76.44114379389393),
                    pitch: Cesium.Math.toRadians(-45.885231170992974),
                    roll: Cesium.Math.toRadians(0.0007144117132606773)
                }
            });
            subtitles.value = ''
            viewer?.scene.primitives.remove(google3dtiles);

            registerUpwrBuildings(true).then(() => {
                setTimeout(() => {
                upwrBuildingsDataSource?.entities.values.forEach(entity => {
                    const id = entity.properties?.A._value;
                    if (typeof id === 'string') {
                        if (id.startsWith('A')) {
                            entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(235, 204, 54, 255));
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
                    subtitles.value = 'Oprowadzę cię po kampusie. Zółtym kolorem będą oznaczone budynki, które będę omawiał. Teraz widzimy budynki A.'
                }, 3000);
            });
            break;
            case 3:
                isDisabled.value = true;
                setTimeout(() => {
                    isDisabled.value = false;
                }, 4000);
                viewer?.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(17.06217044127606, 51.11171599664109, 534.382671398702),
                    orientation: {
                        heading: Cesium.Math.toRadians(76.4411455541573),
                        pitch: Cesium.Math.toRadians(-45.88523158258889),
                        roll: Cesium.Math.toRadians(0.0007119599105749354)
                    }
                });
                subtitles.value = 'Teraz widzimy budynki B.'
                upwrBuildingsDataSource?.entities.values.forEach(entity => {
                    const id = entity.properties?.A._value;
                    if (typeof id === 'string') {
                        if (id.startsWith('A')) {
                            entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(135, 70, 36, 255));
                        } else if (id.startsWith('B')) {
                            entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(235, 204, 54, 255));
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
                break;
            case 4:
                isDisabled.value = true;
                setTimeout(() => {
                    isDisabled.value = false;
                }, 4000);
                viewer?.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(17.06471091631427, 51.112014159929, 343.16104093486797),
                    orientation: {
                        heading: Cesium.Math.toRadians(316.19943626845526),
                        pitch: Cesium.Math.toRadians(-44.50612954721743),
                        roll: Cesium.Math.toRadians(359.99979528664466)
                    }
                });
                subtitles.value = 'Teraz widzimy budynki C.'
                upwrBuildingsDataSource?.entities.values.forEach(entity => {
                    const id = entity.properties?.A._value;
                    if (typeof id === 'string') {
                        if (id.startsWith('A')) {
                            entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(135, 70, 36, 255));
                        } else if (id.startsWith('B')) {
                            entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(131, 105, 30, 255));
                        } else if (id.startsWith('C')) {
                            entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(235, 204, 54, 255));
                        } else if (id.startsWith('D')) {
                            entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(52, 171, 116, 255));
                        } else if (id.startsWith('E')) {
                            entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(0, 199, 193, 255));
                        } else if (id.startsWith('F')) {
                            entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(71, 64, 99, 255));
                        }
                    }
                });
                break;
            case 5:
                isDisabled.value = true;
                setTimeout(() => {
                    isDisabled.value = false;
                }, 4000);
                viewer?.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(17.091606072405998, 51.0966702945695, 480.374963867371),
                    orientation: {
                        heading: Cesium.Math.toRadians(58.582142531103365),
                        pitch: Cesium.Math.toRadians(-42.091390997390576),
                        roll: Cesium.Math.toRadians(0.00013445902469524126)
                    }
                });
                subtitles.value = 'Teraz widzimy budynki E.'
                upwrBuildingsDataSource?.entities.values.forEach(entity => {
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
                            entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(235, 204, 54, 255));
                        } else if (id.startsWith('F')) {
                            entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(71, 64, 99, 255));
                        }
                    }
                });
                break;
            case 6:
                isDisabled.value = true;
                setTimeout(() => {
                    isDisabled.value = false;
                }, 4000);
                viewer?.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(17.09223958969798, 51.098189882743284, 480.93030382570817),
                    orientation: {
                        heading: Cesium.Math.toRadians(58.58214416903895),
                        pitch: Cesium.Math.toRadians(-42.09139210500142),
                        roll: Cesium.Math.toRadians(0.00013201549435233704)
                    }
                });
                subtitles.value = 'Teraz widzimy budynki F.'
                upwrBuildingsDataSource?.entities.values.forEach(entity => {
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
                            entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(235, 204, 54, 255));
                        }
                    }
                });
                break;
            case 7:
                isDisabled.value = true;
                setTimeout(() => {
                    isDisabled.value = false;
                }, 4000);
                viewer?.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(17.09285229327533, 51.09969894789575, 515.3181039957863),
                    orientation: {
                        heading: Cesium.Math.toRadians(62.292488357792614),
                        pitch: Cesium.Math.toRadians(-36.65367804753133),
                        roll: Cesium.Math.toRadians(0.00023955936049139262)
                    }
                });
                subtitles.value = 'Teraz widzimy budynki D.'
                upwrBuildingsDataSource?.entities.values.forEach(entity => {
                    const id = entity.properties?.A._value;
                    if (typeof id === 'string') {
                        if (id.startsWith('A')) {
                            entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(135, 70, 36, 255));
                        } else if (id.startsWith('B')) {
                            entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(131, 105, 30, 255));
                        } else if (id.startsWith('C')) {
                            entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(108, 140, 58, 255));
                        } else if (id.startsWith('D')) {
                            entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(235, 204, 54, 255));
                        } else if (id.startsWith('E')) {
                            entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(0, 199, 193, 255));
                        } else if (id.startsWith('F')) {
                            entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(71, 64, 99, 255));
                        }
                    }
                });
                break;
            case 8:
                isDisabled.value = true;
                setTimeout(() => {
                    isDisabled.value = false;
                }, 4000);
                viewer?.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(17.06817995608056, 51.11433955360643, 1225.0373370047944),
                    orientation: {
                        heading: Cesium.Math.toRadians(0),
                        pitch: Cesium.Math.toRadians(-88.02458210179115),
                        roll: Cesium.Math.toRadians(0)
                    }
                });
                subtitles.value = 'Teraz widzimy budynki D.'
                upwrBuildingsDataSource?.entities.values.forEach(entity => {
                    const id = entity.properties?.A._value;
                    if (typeof id === 'string') {
                        if (id.startsWith('A')) {
                            entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(135, 70, 36, 255));
                        } else if (id.startsWith('B')) {
                            entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(131, 105, 30, 255));
                        } else if (id.startsWith('C')) {
                            entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(108, 140, 58, 255));
                        } else if (id.startsWith('D')) {
                            entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(235, 204, 54, 255));
                        } else if (id.startsWith('E')) {
                            entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(0, 199, 193, 255));
                        } else if (id.startsWith('F')) {
                            entity.polygon!.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(71, 64, 99, 255));
                        }
                    }
                });
                break;
    }
}