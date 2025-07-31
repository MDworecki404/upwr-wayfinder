<script lang="ts" setup>
import { inject } from 'vue';
import { popUpData } from '../../services/popUpStates';

const hidePopUp = inject('hidePopUp') as () => void;
</script>

<template>
    <v-card :width="300">
        <v-card-title>
        <v-divider></v-divider>
            <v-row class="d-flex justify-space-between align-center">
                <v-col cols="12" class="d-flex justify-start align-center">
                    <span class="ml-2">{{$t('popUpTitle')}}</span>
                    <v-icon class="position-absolute right-0 ma-2" style="cursor: pointer;" @click="hidePopUp">mdi-close</v-icon>
                </v-col>
            </v-row>
        </v-card-title>
        <v-card-text class="mt-2">
            <p v-html="popUpData.title"></p>
            <p v-html="popUpData.description"></p>
        </v-card-text>
    </v-card>
</template>



<style scoped>  
</style>