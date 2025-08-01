<script setup lang="ts">
import { inject, type Ref } from 'vue';

const isDescriptionsDialogVisible = inject('isDescriptionsDialogVisible') as Ref<boolean>;
const toggleDescriptionsDialogVisibility = inject('toggleDescriptionsDialogVisibility') as () => void;
</script>

<template>
    <v-dialog v-model="isDescriptionsDialogVisible" width="500">
        <v-card>
            <v-card-title>{{$t('projectDescription')}}</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                {{$t('projectDescriptionText')}}
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
                {{$t('technologies')}}
            </v-card-text>
            <v-card-text class="d-flex justify-center align-center flex-wrap">
                <v-tooltip text="CesiumJS" location="bottom">
                    <template v-slot:activator="{ props }">
                        <a href="https://cesium.com/platform/cesiumjs/" target="_blank" v-bind="props">
                            <img class="ma-2" src="../assets/technologiesIcons/CesiumJS_dark_color.svg" alt="CesiumJS" :width="200">
                        </a>
                    </template>
                </v-tooltip>
                <v-tooltip text="OpenLayers" location="bottom">
                    <template v-slot:activator="{ props }">
                        <a href="https://openlayers.org/" target="_blank" v-bind="props">
                            <img class="ma-2" src="../assets/technologiesIcons/OpenLayers_Logo_200x200.png" alt="CesiumJS" :width="100">
                        </a>
                    </template>
                </v-tooltip>
                
                <v-tooltip text="Vue.js" location="bottom">
                    <template v-slot:activator="{ props }">
                        <a href="https://vuejs.org/" target="_blank" v-bind="props">
                            <img class="ma-2" src="../assets/technologiesIcons/vuejs.png" alt="CesiumJS" :width="100">
                        </a>
                    </template>
                </v-tooltip>
                
                <v-tooltip text="Vuetify" location="bottom">
                    <template v-slot:activator="{ props }">
                        <a href="https://vuetifyjs.com/en/" target="_blank" v-bind="props">
                            <img class="ma-2" src="../assets/technologiesIcons/v-logo.svg" alt="CesiumJS" :width="100">
                        </a>
                    </template>
                </v-tooltip>
                
                <v-tooltip text="TypeScript" location="bottom">
                    <template v-slot:activator="{ props }">
                        <a href="https://www.typescriptlang.org/" target="_blank" v-bind="props">
                            <img class="ma-2" src="../assets/technologiesIcons/typescript.png" alt="CesiumJS" :width="100">
                        </a>
                    </template>
                </v-tooltip>
                
                <v-tooltip text="Sass" location="bottom">
                    <template v-slot:activator="{ props }">
                        <a href="https://sass-lang.com/" target="_blank" v-bind="props">
                            <img class="ma-2" src="../assets/technologiesIcons/sass.png" alt="CesiumJS" :width="100">
                        </a>
                    </template>
                </v-tooltip>
                
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="toggleDescriptionsDialogVisibility">{{$t('close')}}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>

img{
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
}

img:hover{
    transform: scale(1.1);
}

</style>