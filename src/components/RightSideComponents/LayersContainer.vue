<script setup lang="ts">
import {inject, type Ref} from 'vue';
import { 
    register3DGoogleTiles, 
    register3DOSM3DTiles,
    registerLod1Buildings,
    registerUpwrBuildings
}  from '../../services/layers';
import { changeBasemap } from '../../services/basemaps';
import { defineAsyncComponent, ref, watch } from 'vue';
import { zoomTo } from '../../services/zoomTo'
import { changeOlBasemap } from '../../services/olBasemaps';
import { olRegisterUpwrBuildings } from '../../services/olLayers';

const SearchComponent = defineAsyncComponent(() => import('./SearchComponent.vue'));

// Inject stanu z App.vue zamiast lokalnych refów
const selectedBasemap = inject('selectedBasemap') as any;
const expandedBasemap = inject('expandedBasemap') as any;
const expandedLayers = inject('expandedLayers') as any;
const selectedLayer = inject('selectedLayer') as any;

const isGoogle3dtilesEnabled = ref(selectedLayer.value.google3dtiles);
const isOsm3dtilesEnabled = ref(selectedLayer.value.osm3dtiles);
const isLod1BuildingsEnabled = ref(selectedLayer.value.lod1buildings);
const isOrtoBasemapEnabled = ref(selectedBasemap.value === 'ortho');
const isOSMBasemapEnabled = ref(selectedBasemap.value === 'osm');
const isUpwrBuildingsEnabled = ref(selectedLayer.value.upwrbuildings);
const isUpwrBuildingsLegendVisible = inject('isUpwrBuildingsLegendVisible') as Ref<boolean>;
const showPopUp = inject('showPopUp') as () => void;
const isGoogleBasemapEnabled = ref(selectedBasemap.value === 'google');
const isEsriBasemapEnabled = ref(selectedBasemap.value === 'esri');
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

</script>

<template>  
    <v-card rounded="0" :width="300">
        <v-card-title class="bg-blue-lighten-1">
            {{ $t('layersPanel')}} 
            <v-icon class="position-absolute top-0 right-0 ma-2" style="cursor: pointer;"  @click="toggleLayerComponentVisibility">mdi-close</v-icon>
        </v-card-title>
        <v-card-text v-if="mapType === '3d'" class="pa-0">
            <v-expansion-panels class="b-0 outline-0" focusable v-model="expandedBasemap">
                <v-expansion-panel 
                collapse-icon="mdi-map"
                variant="accordion" 
                :focusable="false"
                >
                    <v-expansion-panel-title class="small-title" color="grey-lighten-3">{{ $t('basemaps')}}</v-expansion-panel-title>
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
                    <v-expansion-panel-title class="small-title" color="grey-lighten-3">{{ $t('layers3D')}}</v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-row class="align-center justify-start">
                            <v-checkbox 
                                color="info" 
                                v-model="selectedLayer.google3dtiles" 
                                @click="isGoogle3dtilesEnabled = !isGoogle3dtilesEnabled" 
                            />
                            <span class="mb-5 text-subtitle-1">{{ $t('google3dtiles') }}</span>
                        </v-row>
                        <v-row class="align-center justify-start">
                            <v-checkbox 
                                color="info" 
                                v-model="selectedLayer.osm3dtiles" 
                                @click="isOsm3dtilesEnabled = !isOsm3dtilesEnabled" 
                            />
                            <span class="mb-5 text-subtitle-1">{{ $t('osm3dtiles') }}</span>
                        </v-row>
                        <v-row class="align-center justify-space-between">
                            <div class="d-flex align-center">
                                <v-checkbox 
                                    color="info" 
                                    v-model="selectedLayer.lod1buildings" 
                                    @click="isLod1BuildingsEnabled = !isLod1BuildingsEnabled"  
                                />
                                <span class="mb-5 text-subtitle-1">{{ $t('lod1buildings') }}</span>
                            </div>
                            <div class="d-flex" v-if="isLod1BuildingsEnabled">
                                <v-btn class="mb-5" icon size="x-small" variant="text" @click="zoomTo('lod1buildings')">
                                    <v-icon>mdi-magnify</v-icon>
                                </v-btn>
                            </div>
                        </v-row>
                        <v-row class="align-center justify-space-between">
                            <div class="d-flex align-center">
                                <v-checkbox 
                                    color="info" 
                                    v-model="selectedLayer.upwrbuildings" 
                                    @click="isUpwrBuildingsEnabled = !isUpwrBuildingsEnabled" 
                                />
                                <span class="mb-5 text-subtitle-1">{{ $t('upwrbuildings') }}</span>
                            </div>
                            <div class="d-flex" v-if="isUpwrBuildingsEnabled">
                                <v-btn class="mb-5" icon size="x-small" variant="text" @click="isUpwrBuildingsLegendVisible = !isUpwrBuildingsLegendVisible">
                                    <v-icon>mdi-map-legend</v-icon>
                                </v-btn>    
                                <v-btn class="mb-5" icon size="x-small" variant="text" @click="zoomTo('upwrBuildingsDataSource')">
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
            <hr>
        </v-card-text>
        <v-card-text v-if="mapType === '2d'" class="pa-0">
            <v-expansion-panels class="b-0 outline-0" focusable v-model="expandedBasemap">
                <v-expansion-panel 
                collapse-icon="mdi-map"
                variant="accordion" 
                :focusable="false"
                >
                    <v-expansion-panel-title class="small-title" color="grey-lighten-3">{{ $t('basemaps')}}</v-expansion-panel-title>
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
                    <v-expansion-panel-title class="small-title" color="grey-lighten-3">{{ $t('layers2D')}}</v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-row class="align-center justify-space-between">
                            <div class="d-flex align-center">
                                <v-checkbox 
                                    color="info" 
                                    v-model="selectedLayer.upwrbuildings" 
                                    @click="isUpwrBuildingsEnabled = !isUpwrBuildingsEnabled" 
                                />
                                <span class="mb-5 text-subtitle-1">{{ $t('upwrbuildings') }}</span>
                            </div>
                            <div class="d-flex" v-if="isUpwrBuildingsEnabled">
                                <v-btn class="mb-5" icon size="x-small" variant="text" @click="isUpwrBuildingsLegendVisible = !isUpwrBuildingsLegendVisible">
                                    <v-icon>mdi-map-legend</v-icon>
                                </v-btn>    
                                <v-btn class="mb-5" icon size="x-small" variant="text" @click="zoomTo('upwrBuildingsDataSource')">
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
            <hr>
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
</style>