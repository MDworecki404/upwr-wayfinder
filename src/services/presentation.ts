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
                    subtitles.value = 'Oprowadzę cię po kampusie. Zółtym kolorem będą oznaczone budynki, które będę omawiał. Budynki A stanowią serce administracyjne uczelni, skupiając kluczowe jednostki zarządzające. Znajdują się tu władze rektorskie, kwestura, biura obsługi studentów oraz główna biblioteka. To także miejsce prowadzenia zajęć w salach oznaczonych literami Z, R i W. Budynki A1-A8 i A12 mieszczą między innymi Centrum Spraw Studenckich, Samorząd Studencki, Szkołę Doktorską oraz jednostki medycyny weterynaryjnej.'
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
                subtitles.value = 'Kompleks budynków B (B1-B9) to centrum weterynaryjne uczelni, gdzie prowadzona jest praktyczna nauka i leczenie zwierząt. Znajdziemy tu kliniki dla różnych gatunków - od koni, psów i kotów po ptaki i zwierzęta egzotyczne. Budynki mieszczą też katedry chorób wewnętrznych, chirurgii oraz rozrodu zwierząt. To miejsce, gdzie teoria spotyka się z praktyką weterynaryjną.'
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
                subtitles.value = 'Budynki C1-C5 to dom dla wydziałów związanych z naukami o środowisku, geodezją i technologiami rolniczymi. Mieszczą się tu instytuty geodezji, inżynierii środowiska, nauk o glebie oraz katedry ochrony roślin i architektury krajobrazu. Sale oznaczone literami G, M i C służą zajęciom z zakresu kształtowania i ochrony środowiska.'
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
                subtitles.value = 'Kompleks E (E1-E13) skupia się na naukach biologicznych i hodowli zwierząt. To tu działają instytuty biologii, hodowli zwierząt, katedry genetyki oraz centra badawcze. Budynki mieszczą nowoczesne laboratoria, wiwarium wydziałowe, Muzeum Bioróżnorodności oraz Pracownię Mikroskopii Elektronowej. Dziekanat Wydziału Biologii i Hodowli Zwierząt również ma tu swoją siedzibę.'
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
                subtitles.value = 'Budynki F1-F13 to przestrzeń dla inżynierii rolniczej, biotechnologii i nauk o żywności. Znajdują się tu hale maszyn, warsztaty, laboratoria oraz Centrum Odnawialnych Źródeł Energii. Kompleks obejmuje też obiekty sportowe - halę sportową i krytą pływalnię. Katedry zajmują się technologiami żywności, biotechnologią i żywieniem człowieka.'
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
                subtitles.value = 'Zespół domów studenckich DS1-DS6 to miejsca zamieszkania dla studentów UPWr. Każdy dom ma swoją nazwę: "Arka", "Centaur", "Labirynt", "Talizman", "Zodiak" i "Raj". Oprócz funkcji mieszkalnej, w DS3 "Labirynt" mieści się Wydawnictwo Uniwersytetu oraz Archiwum. To przestrzenie integrujące społeczność studencką i zapewniające komfortowe warunki życia podczas studiów.'
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
                subtitles.value = 'Zespół domów studenckich DS1-DS6 to miejsca zamieszkania dla studentów UPWr. Każdy dom ma swoją nazwę: "Arka", "Centaur", "Labirynt", "Talizman", "Zodiak" i "Raj". Oprócz funkcji mieszkalnej, w DS3 "Labirynt" mieści się Wydawnictwo Uniwersytetu oraz Archiwum. To przestrzenie integrujące społeczność studencką i zapewniające komfortowe warunki życia podczas studiów.'
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