<script setup lang="ts">
import {inject} from 'vue';
import { 
    register3DGoogleTiles, 
    register3DOSM3DTiles,
    registerLod1Buildings
}  from '../../services/layers';
import { changeBasemap } from '../../services/basemaps';
import { ref, watch } from 'vue';

// Inject stanu z App.vue zamiast lokalnych refów
const selectedBasemap = inject('selectedBasemap') as any;
const expandedBasemap = inject('expandedBasemap') as any;
const expandedLayers = inject('expandedLayers') as any;
const selectedLayer = inject('selectedLayer') as any;

const isGoogle3dtilesEnabled = ref(false);
const isOsm3dtilesEnabled = ref(false);
const isLod1BuildingsEnabled = ref(false);
const isOrtoBasemapEnabled = ref(false);
const isOSMBasemapEnabled = ref(false);

watch(isGoogle3dtilesEnabled, (newVal) => {
    register3DGoogleTiles(newVal);
});

watch(isOsm3dtilesEnabled, (newVal) => {
    register3DOSM3DTiles(newVal);
});

watch(isLod1BuildingsEnabled, (newVal) => {
    registerLod1Buildings(newVal);
});

watch(selectedBasemap, (newVal) => {
    changeBasemap(newVal);
});

const toggleLayerComponentVisibility = inject('toggleLayerComponentVisibility') as () => void;

</script>

<template>  
    <v-card :width="300">
        <v-card-title>
            {{ $t('layersPanel')}} 
            <v-icon class="position-absolute top-0 right-0 ma-2" style="cursor: pointer;" color="primary" @click="toggleLayerComponentVisibility">mdi-close</v-icon>
        </v-card-title>
        <v-card-text class="pa-0">
            <v-expansion-panels class="b-0 outline-0" focusable v-model="expandedBasemap">
                <v-expansion-panel 
                collapse-icon="mdi-map"
                variant="accordion" 
                :focusable="false"
                >
                    <v-expansion-panel-title>{{ $t('basemaps')}}</v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-radio-group v-model="selectedBasemap">
                            <v-radio color="primary" label="OpenStreetMap" value="osm" @check="isOSMBasemapEnabled = !isOSMBasemapEnabled"></v-radio>
                            <v-radio color="primary" :label="$t('orto')" value="ortho" @change="isOrtoBasemapEnabled = !isOrtoBasemapEnabled"></v-radio>
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
                    <v-expansion-panel-title>{{ $t('layers3D')}}</v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-checkbox color="info" v-model="selectedLayer.google3dtiles" @click="isGoogle3dtilesEnabled = !isGoogle3dtilesEnabled" :label="$t('google3dtiles')"></v-checkbox>
                        <v-checkbox color="info" v-model="selectedLayer.osm3dtiles" @click="isOsm3dtilesEnabled = !isOsm3dtilesEnabled" :label="$t('osm3dtiles')"></v-checkbox>
                        <v-checkbox color="info" v-model="selectedLayer.lod1buildings" @click="isLod1BuildingsEnabled = !isLod1BuildingsEnabled" :label="$t('lod1buildings')"></v-checkbox>
                        <v-checkbox color="info" v-model="selectedLayer.upwrbuildings" :label="$t('upwrbuildings')"></v-checkbox>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
            <hr>
        </v-card-text>
    </v-card>
</template>

<style scoped lang="scss">
.v-checkbox{
    margin-bottom: -25px;
}
</style>