<script lang="ts" setup>
import servicesRepo from '../data/serviceRepository.json'
import { inject, ref, type Ref} from 'vue'

const emit = defineEmits(['service-selected'])

const wmsServices = servicesRepo.WMS;
const wmtsServices = servicesRepo.WMTS;

const selectedServiceType = inject('selectedServiceType') as Ref<string>

const wmsHeaders = ref([
  { title: 'Tytuł', value: 'WMS_Title', key: 'WMS_Title' },
  { title: 'Organizacja', value: 'ContactOrganization', key: 'ContactOrganization' },
  { title: 'Akcje', value: 'actions', key: 'actions', sortable: false },
]);

const wmtsHeaders = ref([
  { title: 'Tytuł', value: 'WMTS_Title', key: 'WMTS_Title' },
  { title: 'Organizacja', value: 'ContactOrganization', key: 'ContactOrganization' },
  { title: 'Akcje', value: 'actions', key: 'actions', sortable: false },
]);

const handleButtonClick = (item: any) => {
  emit('service-selected', item)
};
</script>

<template>
    <v-data-table
        v-if="selectedServiceType === 'WMS'"
        :items-per-page="5"
        :items="wmsServices"
        :headers="wmsHeaders"
    >
        <template v-slot:[`item.actions`]="{ item }">
            <v-btn
                variant="plain"
                icon
                size="small"
                @click="handleButtonClick(item)"
            >
                <v-icon color="primary">mdi-check</v-icon>
            </v-btn>
        </template>
    </v-data-table>
    
    <v-data-table
        v-if="selectedServiceType === 'WMTS'"
        :items-per-page="5"
        :items="wmtsServices"
        :headers="wmtsHeaders"
    >
        <template v-slot:[`item.actions`]="{ item }">
            <v-btn
                variant="plain"
                icon
                size="small"
                @click="handleButtonClick(item)"
            >
                <v-icon color="primary">mdi-check</v-icon>
            </v-btn>
        </template>
    </v-data-table>
</template>