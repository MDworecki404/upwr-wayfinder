<script setup lang="ts">
import { inject, type Ref } from 'vue';

const isUpwrBuildingsLegendVisible = inject('isUpwrBuildingsLegendVisible') as Ref<boolean>;
const toggleUpwrBuildingsLegendVisibility = inject('toggleUpwrBuildingsLegendVisibility') as () => void;
</script>

<template>
    <v-card class="ma-2" v-if="isUpwrBuildingsLegendVisible">
        <v-card-title class="d-flex align-center">
            {{ $t('legend') }}
            <v-icon class="position-absolute top-0 right-0 ma-2" style="cursor: pointer;"  @click="toggleUpwrBuildingsLegendVisibility">mdi-close</v-icon>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-row class="d-flex justify-center align-center">
                <v-card :width="25" :height="25" class="ma-2" color="rgb(135, 70, 36)">
                    
                </v-card>
                <v-card-text>{{ $t('budynkiA') }}</v-card-text>
                <v-card :width="25" :height="25" class="ma-2" color="rgb(131, 105, 30)"></v-card>
                <v-card-text>{{ $t('budynkiB') }}</v-card-text>
            </v-row>
            <v-row class="d-flex justify-center align-center">
                <v-card :width="25" :height="25" class="ma-2" color="rgb(108, 140, 58)"></v-card>
                <v-card-text>{{ $t('budynkiC') }}</v-card-text>
                <v-card :width="25" :height="25" class="ma-2" color="rgb(52, 171, 116)"></v-card>
                <v-card-text>{{ $t('budynkiD') }}</v-card-text>
            </v-row>
            <v-row class="d-flex justify-center align-center">
                <v-card :width="25" :height="25" class="ma-2" color="rgb(0, 199, 193)"></v-card>
                <v-card-text>{{ $t('budynkiE') }}</v-card-text>
                <v-card :width="25" :height="25" class="ma-2" color="rgb(71, 64, 99)"></v-card>
                <v-card-text>{{ $t('budynkiF') }}</v-card-text>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<style scoped lang="scss"></style>