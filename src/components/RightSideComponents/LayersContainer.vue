<script setup lang="ts">
import {inject, type Ref} from 'vue';
import { 
    register3DGoogleTiles, 
    register3DOSM3DTiles,
    registerLod1Buildings,
    registerUpwrBuildings,
    registerDemWroclaw
}  from '../../services/layers';
import { changeBasemap } from '../../services/basemaps';
import { defineAsyncComponent, ref, watch } from 'vue';
import { zoomTo } from '../../services/zoomTo'
import { changeOlBasemap } from '../../services/olBasemaps';
import { olRegisterUpwrBuildings } from '../../services/olLayers';
import { viewer } from '../../services/displayMap';
import { map } from '../../services/olMap';

const SearchComponent = defineAsyncComponent(() => import('./SearchComponent.vue'));

// Inject stanu z App.vue zamiast lokalnych refów
const selectedBasemap = inject('selectedBasemap') as any;
const expandedBasemap = inject('expandedBasemap') as any;
const expandedLayers = inject('expandedLayers') as any;
const expandedWMS = inject('expandedWMS') as any
const expandedWMTS = inject('expandedWMTS') as any
const selectedLayer = inject('selectedLayer') as any;

const isGoogle3dtilesEnabled = inject('isGoogle3dtilesEnabled') as Ref<boolean>;
const isOsm3dtilesEnabled = inject('isOsm3dtilesEnabled') as Ref<boolean>;
const isLod1BuildingsEnabled = inject('isLod1BuildingsEnabled') as Ref<boolean>;
const isOrtoBasemapEnabled = ref(selectedBasemap.value === 'ortho');
const isOSMBasemapEnabled = ref(selectedBasemap.value === 'osm');
const isUpwrBuildingsEnabled = inject('isUpwrBuildingsEnabled') as Ref<boolean>;
const isUpwrBuildingsLegendVisible = inject('isUpwrBuildingsLegendVisible') as Ref<boolean>;
const showPopUp = inject('showPopUp') as () => void;
const isGoogleBasemapEnabled = ref(selectedBasemap.value === 'google');
const isEsriBasemapEnabled = ref(selectedBasemap.value === 'esri');
const isDemEnabled = inject('isDemEnabled') as Ref<boolean>;

watch(isGoogle3dtilesEnabled, (newVal) => {
    register3DGoogleTiles(newVal);
});

watch(isOsm3dtilesEnabled, (newVal) => {
    register3DOSM3DTiles(newVal);
});

watch(isLod1BuildingsEnabled, (newVal) => {
    registerLod1Buildings(newVal);
});

watch(isUpwrBuildingsEnabled, (newVal) => {
    if (mapType.value === '3d'){
        registerUpwrBuildings(newVal, showPopUp);
    } else if (mapType.value === '2d') {
        olRegisterUpwrBuildings(newVal, showPopUp);
    }
});

watch(isDemEnabled, (newVal) => {
    registerDemWroclaw(newVal);
});

watch(selectedBasemap, (newVal) => {
    if (mapType.value === '3d'){
        changeBasemap(newVal);
    } else {
        changeOlBasemap(newVal);
    }
    
    // Aktualizuj zmienne stanu basemap
    isOSMBasemapEnabled.value = newVal === 'osm';
    isOrtoBasemapEnabled.value = newVal === 'ortho';
    isGoogleBasemapEnabled.value = newVal === 'google';
    isEsriBasemapEnabled.value = newVal === 'esri';
});

const toggleLayerComponentVisibility = inject('toggleLayerComponentVisibility') as () => void;

const mapType = inject('mapType') as Ref<string>;
const mapVersion = ref('3d')

watch(mapType, (newVal) => {
    mapVersion.value = newVal
})

interface TempWmsEntry {
  resource: {
    id: string;
    title: string;
    enabled: boolean;
    temporaryImageryLayer: any;
  };
}

const tempWMSArray = inject('tempWMSArray') as Ref<TempWmsEntry[]>;
const tempWMTSArray = inject('tempWMTSArray') as Ref<TempWmsEntry[]>;

const showWMSLayer = (id: string) => {
  const found = tempWMSArray.value.find(entry => entry.resource.id === id);

  if (found) {
    console.log('Znaleziono warstwę:', found.resource);
  } else {
    console.warn(`Nie znaleziono warstwy o id: ${id}`);
  }

  if(mapType.value === '3d'){
    const layer = found?.resource.temporaryImageryLayer
    layer.show = !layer.show
  } else if(mapType.value === '2d') {
    const layer = found?.resource.temporaryImageryLayer
    layer.setVisible(!layer.values_.visible)
  }
}

const deleteWMSLayer = (id: string) => {
  const index = tempWMSArray.value.findIndex(entry => entry.resource.id === id);

  if (index !== -1) {
    const layerToRemove = tempWMSArray.value[index].resource.temporaryImageryLayer;
    if(mapType.value === '3d'){
        layerToRemove.show = false

        if (viewer && layerToRemove) {
          viewer.imageryLayers.remove(layerToRemove, true);
        }
    } else if(mapType.value === '2d') {
        if (map && layerToRemove) {
          layerToRemove.setVisible(false)
          map.removeLayer(layerToRemove)
        }
    }

    tempWMSArray.value.splice(index, 1);
  } else {
    return false
  }
};

const showWMTSLayer = (id: string) => {
  const found = tempWMTSArray.value.find(entry => entry.resource.id === id);

  if (found) {
    console.log('Znaleziono warstwę:', found.resource);
  } else {
    console.warn(`Nie znaleziono warstwy o id: ${id}`);
  }

  if(mapType.value === '3d'){
    const layer = found?.resource.temporaryImageryLayer
    layer.show = !layer.show
  } else if(mapType.value === '2d') {
    const layer = found?.resource.temporaryImageryLayer
    layer.setVisible(!layer.values_.visible)
  }
}

const deleteWMTSLayer = (id: string) => {
  const index = tempWMTSArray.value.findIndex(entry => entry.resource.id === id);

  if (index !== -1) {
    const layerToRemove = tempWMTSArray.value[index].resource.temporaryImageryLayer;
    if(mapType.value === '3d'){
        layerToRemove.show = false

        if (viewer && layerToRemove) {
          viewer.imageryLayers.remove(layerToRemove, true);
        }
    } else if(mapType.value === '2d') {
        if (map && layerToRemove) {
          layerToRemove.setVisible(false)
          map.removeLayer(layerToRemove)
        }
    }

    tempWMTSArray.value.splice(index, 1);
  } else {
    return false
  }
};

</script>

<template>  
    <v-card rounded="0" :width="300">
        <v-card-title>
            {{ $t('layersPanel')}} 
            <v-icon class="position-absolute top-0 right-0 ma-2" style="cursor: pointer;"  @click="toggleLayerComponentVisibility">mdi-close</v-icon>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text v-if="mapType === '3d'" class="pa-0">
            <v-expansion-panels class="b-0 outline-0"  v-model="expandedBasemap">
                <v-expansion-panel 
                collapse-icon="mdi-map"
                variant="accordion" 
                :focusable="false"
                >
                    <v-expansion-panel-title class="small-title" color="white">{{ $t('basemaps')}}</v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-radio-group v-model="selectedBasemap">
                            <v-radio color="primary" label="OpenStreetMap" value="osm" @check="isOSMBasemapEnabled = !isOSMBasemapEnabled"></v-radio>
                            <v-radio color="primary" :label="$t('orto')" value="ortho" @check="isOrtoBasemapEnabled = !isOrtoBasemapEnabled"></v-radio>
                            <v-radio color="primary" :label="$t('google')" value="google" @check="isGoogleBasemapEnabled = !isGoogleBasemapEnabled"></v-radio>
                            <v-radio color="primary" :label="$t('esri')" value="esri" @check="isEsriBasemapEnabled = !isEsriBasemapEnabled"></v-radio>
                        </v-radio-group>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
            <v-expansion-panels class="b-0 outline-0" focusable v-model="expandedLayers">
                <v-expansion-panel 
                elevation="0"
                :focusable="false" 
                variant="accordion"
                collapse-icon="mdi-layers"
                >
                    <v-expansion-panel-title  class="small-title" color="white">{{ $t('layers3D')}}</v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-row class="align-center justify-start">
                            <v-checkbox 
                                color="info" 
                                v-model="selectedLayer.dem" 
                                @change="isDemEnabled = !isDemEnabled" 
                            />
                            <span class="mb-5 text-subtitle-1">{{ $t('dem') }}</span>
                        </v-row>
                        <v-row class="align-center justify-start">
                            <v-checkbox 
                                color="info" 
                                v-model="selectedLayer.google3dtiles" 
                                @change="isGoogle3dtilesEnabled = !isGoogle3dtilesEnabled" 
                            />
                            <span class="mb-5 text-subtitle-1">{{ $t('google3dtiles') }}</span>
                        </v-row>
                        <v-row class="align-center justify-start">
                            <v-checkbox 
                                color="info" 
                                v-model="selectedLayer.osm3dtiles" 
                                @change="isOsm3dtilesEnabled = !isOsm3dtilesEnabled" 
                            />
                            <span class="mb-5 text-subtitle-1">{{ $t('osm3dtiles') }}</span>
                        </v-row>
                        <v-row class="align-center justify-space-between">
                            <div class="d-flex align-center">
                                <v-checkbox 
                                    color="info" 
                                    v-model="selectedLayer.lod1buildings" 
                                    @change="isLod1BuildingsEnabled = !isLod1BuildingsEnabled"  
                                />
                                <span class="mb-5 text-subtitle-1">{{ $t('lod1buildings') }}</span>
                            </div>
                            <div class="d-flex" v-if="isLod1BuildingsEnabled">
                                <v-btn class="mb-5" icon size="x-small" variant="text" @click="zoomTo('lod1buildings', mapType)">
                                    <v-icon>mdi-magnify</v-icon>
                                </v-btn>
                            </div>
                        </v-row>
                        <v-row class="align-center justify-space-between">
                            <div class="d-flex align-center">
                                <v-checkbox 
                                    color="info" 
                                    v-model="selectedLayer.upwrbuildings" 
                                    @change="isUpwrBuildingsEnabled = !isUpwrBuildingsEnabled" 
                                />
                                <span class="mb-5 text-subtitle-1">{{ $t('upwrbuildings') }}</span>
                            </div>
                            <div class="d-flex" v-if="isUpwrBuildingsEnabled">
                                <v-btn class="mb-5" icon size="x-small" variant="text" @click="isUpwrBuildingsLegendVisible = !isUpwrBuildingsLegendVisible">
                                    <v-icon>mdi-map-legend</v-icon>
                                </v-btn>    
                                <v-btn class="mb-5" icon size="x-small" variant="text" @click="zoomTo('upwrBuildingsDataSource', mapType)">
                                    <v-icon>mdi-magnify</v-icon>
                                </v-btn>
                            </div>
                        </v-row>
                        <v-row v-if="isUpwrBuildingsEnabled" align="center" justify="space-between">
                            <SearchComponent />
                        </v-row>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card-text>
        <v-card-text v-if="mapType === '2d'" class="pa-0">
            <v-expansion-panels class="b-0 outline-0" focusable v-model="expandedBasemap">
                <v-expansion-panel 
                collapse-icon="mdi-map"
                variant="accordion" 
                :focusable="false"
                >
                    <v-expansion-panel-title class="small-title" color="white">{{ $t('basemaps')}}</v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-radio-group v-model="selectedBasemap">
                            <v-radio color="primary" label="OpenStreetMap" value="osm" @check="isOSMBasemapEnabled = !isOSMBasemapEnabled"></v-radio>
                            <v-radio color="primary" :label="$t('orto')" value="ortho" @check="isOrtoBasemapEnabled = !isOrtoBasemapEnabled"></v-radio>
                            <v-radio color="primary" :label="$t('google')" value="google" @check="isGoogleBasemapEnabled = !isGoogleBasemapEnabled"></v-radio>
                            <v-radio color="primary" :label="$t('esri')" value="esri" @check="isEsriBasemapEnabled = !isEsriBasemapEnabled"></v-radio>
                        </v-radio-group>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
            <v-expansion-panels class="b-0 outline-0" focusable v-model="expandedLayers">
                <v-expansion-panel 
                :focusable="false" 
                variant="accordion"
                collapse-icon="mdi-layers"
                >
                    <v-expansion-panel-title class="small-title" color="white">{{ $t('layers2D')}}</v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-row class="align-center justify-space-between">
                            <div class="d-flex align-center">
                                <v-checkbox 
                                    color="info" 
                                    v-model="selectedLayer.upwrbuildings" 
                                    @change="isUpwrBuildingsEnabled = !isUpwrBuildingsEnabled" 
                                />
                                <span class="mb-5 text-subtitle-1">{{ $t('upwrbuildings') }}</span>
                            </div>
                            <div class="d-flex" v-if="isUpwrBuildingsEnabled">
                                <v-btn class="mb-5" icon size="x-small" variant="text" @click="isUpwrBuildingsLegendVisible = !isUpwrBuildingsLegendVisible">
                                    <v-icon>mdi-map-legend</v-icon>
                                </v-btn>    
                                <v-btn class="mb-5" icon size="x-small" variant="text" @click="zoomTo('upwrBuildingsDataSource', mapType)">
                                    <v-icon>mdi-magnify</v-icon>
                                </v-btn>
                            </div>
                        </v-row>
                        <v-row v-if="isUpwrBuildingsEnabled" align="center" justify="space-between">
                            <SearchComponent />
                        </v-row>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card-text>
        <v-card-text class="pa-0"  v-if="tempWMSArray.length > 0">
            <v-expansion-panels class="b-0 outline-0" focusable v-model="expandedWMS">
                <v-expansion-panel 
                :focusable="false" 
                variant="accordion"
                collapse-icon="mdi-layers"
                >
                    <v-expansion-panel-title class="small-title" color="white">{{ $t('wmsLayers')}}</v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <v-row
                        v-for="(layer, index) in tempWMSArray"
                        :key="layer.resource?.id || index"
                        class="align-center justify-space-between"
                      >
                        <div class="d-flex align-center">
                          <v-checkbox
                              color="info"
                              v-model="layer.resource.enabled"
                              @change="showWMSLayer(layer.resource.id)"
                            >
                              <template #label>
                                <span
                                  class="text-truncate"
                                  style="max-width: 150px; display: inline-block; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"
                                  :title="layer.resource?.title || 'Unnamed Layer'"
                                >
                                  {{ layer.resource?.title || 'Unnamed Layer' }}
                                </span>
                              </template>
                            </v-checkbox>
                          
                        </div>
                        <div class="d-flex">
                            <v-btn class="mb-5" icon size="x-small" variant="text" @click="deleteWMSLayer(layer.resource.id)">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </div>
                      </v-row>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card-text>
        <v-card-text class="pa-0"  v-if="tempWMTSArray.length > 0">
            <v-expansion-panels class="b-0 outline-0" focusable v-model="expandedWMTS">
                <v-expansion-panel 
                :focusable="false" 
                variant="accordion"
                collapse-icon="mdi-layers"
                >
                    <v-expansion-panel-title class="small-title" color="white">{{ $t('wmtsLayers')}}</v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <v-row
                        v-for="(layer, index) in tempWMTSArray"
                        :key="layer.resource?.id || index"
                        class="align-center justify-space-between"
                      >
                        <div class="d-flex align-center">
                          <v-checkbox
                              color="info"
                              v-model="layer.resource.enabled"
                              @change="showWMTSLayer(layer.resource.id)"
                            >
                              <template #label>
                                <span
                                  class="text-truncate"
                                  style="max-width: 150px; display: inline-block; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"
                                  :title="layer.resource?.title || 'Unnamed Layer'"
                                >
                                  {{ layer.resource?.title || 'Unnamed Layer' }}
                                </span>
                              </template>
                            </v-checkbox>
                          
                        </div>
                        <div class="d-flex">
                            <v-btn class="mb-5" icon size="x-small" variant="text" @click="deleteWMTSLayer(layer.resource.id)">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </div>
                      </v-row>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card-text>
    </v-card>
</template>

<style scoped lang="scss">
.v-row{
    height: 40px;
}
.v-row:last-child{
    height: auto;
}
.small-title {
    min-height: 35px !important;
    font-size: 0.9rem;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    display: flex;
    align-items: center;
}

.v-expansion-panel{
    font-weight: 500;
    background-color: white;
    border: none;
    outline: none;
}

</style>