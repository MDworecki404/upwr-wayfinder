<script lang="ts" setup>
import { inject, ref, type Ref } from 'vue';
import { getWmsService } from '../../services/wmsService';

const selectedServiceType = ref('WMS')

const toggleDynamicServiceComponentVisible = inject('toggleDynamicServiceComponentVisible')

const mapType = inject('mapType') as Ref

const tempWMSArray = inject('tempWMSArray') as Ref<object[]>

const url = ref('')

const isFormValidate = () => {
  const trimmedUrl = url.value.trim();
  const pattern = /^https?:\/\/.+\..+/i;
  return pattern.test(trimmedUrl);
}


const triggerDownloadService = async () => {
    if (selectedServiceType.value === 'WMS'){
        const layer = await getWmsService(mapType, url.value)
        console.log(layer)
        tempWMSArray.value.push(layer)
        console.log(tempWMSArray.value)
    }
    
}

</script>

<template>
    <v-card :width="400">
        <v-card-title>
            <v-row class="d-flex justify-space-between align-center">
                <v-col cols="12" class="d-flex justify-start align-center">
                    <span class="ml-2">{{$t('addService')}}</span>
                    <v-icon class="position-absolute right-0 ma-2" style="cursor: pointer;"  @click="toggleDynamicServiceComponentVisible">mdi-close</v-icon>
                </v-col>
            </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <v-text>
            <v-btn-toggle 
                color="info"
                 v-model="selectedServiceType"
                class="d-flex justify-center mt-5 mb-5"
                variant="outlined"
            >
                <v-btn value="WMS" v-model="selectedServiceType" color="info">
                    WMS   
                </v-btn>
            
                <v-btn value="WMTS" v-model="selectedServiceType" color="info"> 
                    WMTS
                </v-btn>
            
            </v-btn-toggle>
            <v-text-field 
                variant="underlined"
                v-model="url"
                :placeholder="$t('url')"
                class="pr-9 pl-9"
                :error="!isFormValidate()"
                :error-messages="!isFormValidate() ? $t('incorrectUrl') : ''"
            >
            </v-text-field>
            <v-card-text class="d-flex justify-end align-center">
                <v-btn
                  prepend-icon="mdi-download" 
                  color="info"
                  variant="outlined" 
                  class="mt-5"
                  @click="triggerDownloadService"
                  :disabled="!isFormValidate()"
                >
                  {{ $t('downloadService') }}
                </v-btn>

            </v-card-text>
        </v-text>
    </v-card>

</template>