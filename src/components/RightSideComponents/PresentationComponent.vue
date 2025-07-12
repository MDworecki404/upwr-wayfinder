<script setup lang="ts">
import { playPresentation, resetPresentation } from '../../services/presentation';
import { inject, ref, type Ref } from 'vue';

import { isDisabled } from '../../services/presentation';

const selectedBasemap = inject('selectedBasemap') as Ref<string>;
const selectedLayer = inject('selectedLayer') as Ref<any>;
const isUpwrBuildingsEnabled = inject('isUpwrBuildingsEnabled') as Ref<boolean>;
const isLod1BuildingsEnabled = inject('isLod1BuildingsEnabled') as Ref<boolean>;
const isOsm3dtilesEnabled = inject('isOsm3dtilesEnabled') as Ref<boolean>;
const isGoogle3dtilesEnabled = inject('isGoogle3dtilesEnabled') as Ref<boolean>;

const triggerPlayPresentation = (step: number) => {
    if (isPresVisible.value) {
        isPresVisible.value = false;
        resetPresentation();
        selectedBasemap.value = 'osm'
        selectedLayer.value.google3dtiles = false
        selectedLayer.value.osm3dtiles = false
        selectedLayer.value.lod1buildings = false
        selectedLayer.value.upwrbuildings = false
        isUpwrBuildingsEnabled.value = false
        isLod1BuildingsEnabled.value = false
        isOsm3dtilesEnabled.value = false
        isGoogle3dtilesEnabled.value = false
    }
    else {
        isPresVisible.value = true;
        playPresentation(step);
    }
}

const togglePresentationComponentVisibility = inject('togglePresentationComponentVisibility') as () => void;

const triggerVisibility = () => {
    togglePresentationComponentVisibility();
    resetPresentation()
    selectedBasemap.value = 'osm'
    selectedLayer.value.google3dtiles = false
    selectedLayer.value.osm3dtiles = false
    selectedLayer.value.lod1buildings = false
    selectedLayer.value.upwrbuildings = false
    isUpwrBuildingsEnabled.value = false
    isLod1BuildingsEnabled.value = false
    isOsm3dtilesEnabled.value = false
    isGoogle3dtilesEnabled.value = false
}

const isPresVisible = ref(false);

const currentStep = ref(1);

const onStepChange = (val: number) => {
    playPresentation(val);
}



</script>
<template>
    <v-card :width="300">
        <v-card-title class="bg-info">
            <v-row class="d-flex justify-space-between align-center">
                <v-col cols="12" class="d-flex justify-start align-center">
                    <span class="ml-2">{{$t('presentation')}}</span>
                    <v-icon class="position-absolute right-0 ma-2" style="cursor: pointer;" @click="triggerVisibility">mdi-close</v-icon>
                </v-col>
            </v-row>
        </v-card-title>
        <v-card-text>
            <v-row class="d-flex justify-center align-center mt-1">
                <v-col cols="12" class="d-flex justify-center align-center">
                    <v-btn color="info" icon="mdi-play" @click="triggerPlayPresentation(1)">
                        <v-icon>mdi-play</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-text v-if="isPresVisible" class="mt-2">
            <v-pagination
            color="primary"
            :length="18" 
            v-model="currentStep"
            :disabled="isDisabled"
            @update:model-value="onStepChange"
            />
        </v-card-text>        
    </v-card>

</template>

<style scoped>
</style>