<script lang="ts" setup>
import { defineAsyncComponent, inject, ref, type Ref, provide} from 'vue';
import { getWmsService } from '../../services/wmsService';
import { getWmtsService } from '../../services/wmtsService';

const RepositoryTable = defineAsyncComponent(() => import('../RepositoryTable.vue'))

const selectedServiceType = ref('WMS')
provide('selectedServiceType', selectedServiceType)

const toggleDynamicServiceComponentVisible = inject('toggleDynamicServiceComponentVisible')

const mapType = inject('mapType') as Ref

const tempWMSArray = inject('tempWMSArray') as Ref<object[]>
const tempWMTSArray = inject('tempWMTSArray') as Ref<object[]>

const url = ref('')
const isDialogActive = ref(false);

const isFormValidate = () => {
  const trimmedUrl = url.value.trim();
  const pattern = /^https?:\/\/.+\..+/i;
  return pattern.test(trimmedUrl);
}

const errorMessage = ref('');

const handleServiceSelected = (service: any) => {
  console.log('Wybrano usługę:', service);
  if (selectedServiceType.value === 'WMS') {
    url.value = service.url;
  } else if (selectedServiceType.value === 'WMTS') {
    url.value = service.url;
  }
  isDialogActive.value = false;
};

const triggerDownloadService = async () => {
errorMessage.value = ''; // zresetuj błąd

  try {
    if (selectedServiceType.value === 'WMS') {
      const layer = await getWmsService(mapType, url.value);
      console.log(layer);
      if (layer && typeof layer === 'object' && !Array.isArray(layer)) {
        tempWMSArray.value.push(layer);
      } else {
        errorMessage.value = 'errorMessageService';
      }
    } else if (selectedServiceType.value === 'WMTS') {
      const layer = await getWmtsService(mapType, url.value);
      console.log(layer);
      if (layer && typeof layer === 'object' && !Array.isArray(layer)) {
        tempWMTSArray.value.push(layer);
      } else {
        errorMessage.value = 'errorMessageService';
      }
    }
  } catch (err) {
    console.error(err);
    errorMessage.value = 'errorMessageService2';
  }
};

</script>

<template>
    <v-card :width="330">
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
            <v-card-text class="d-flex justify-end align-center">

                    <v-dialog max-width="600" v-model="isDialogActive">
                        <template v-slot:activator="{ props: activatorProps }">
                            <v-btn
                                v-bind="activatorProps"
                                prepend-icon="mdi-download" 
                                color="info"
                                variant="outlined" 
                                class="mt-0"
                            >
                                {{ $t('downloadFromRepo') }}
                            </v-btn>
                        </template>
                        <template v-slot:default="{ isActive }">
                          <v-card>
                            <v-card-text>
                              <RepositoryTable @service-selected="handleServiceSelected" />
                            </v-card-text>
                        
                            <v-card-actions>
                              <v-spacer></v-spacer>
                            
                              <v-btn
                                :text="$t('close')"
                                @click="isActive.value = false"
                              ></v-btn>
                            </v-card-actions>
                          </v-card>
                        </template>
                    </v-dialog>
                
            </v-card-text>
            <v-text-field 
                variant="underlined"
                v-model="url"
                :placeholder="$t('url')"
                class="pr-9 pl-9"
                :error="!isFormValidate()"
                :error-messages="!isFormValidate() ? $t('incorrectUrl') : ''"
            >
            </v-text-field>
            <v-alert
              v-if="errorMessage"
              type="error"
              class="ma-4"
              dense
              border="start"
              color="error"
              variant="outlined"
            >
              {{ $t(errorMessage) }}
            </v-alert>
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