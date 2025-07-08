<script setup lang="ts">
import { playPresentation, resetPresentation } from '../../services/presentation';
import { inject, ref } from 'vue';

import { isDisabled } from '../../services/presentation';


const triggerPlayPresentation = (step: number) => {
    if (isPresVisible.value) {
        isPresVisible.value = false;
        resetPresentation();
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
}

const isPresVisible = ref(false);

const currentStep = ref(1);

const onStepChange = (val: number) => {
    playPresentation(val);
}



</script>
<template>
    <v-card :width="300">
        <v-card-title class="bg-blue-lighten-1">
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