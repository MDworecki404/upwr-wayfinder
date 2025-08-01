<script setup lang="ts">
import universityBuildings from '../../data/universityBuildings.json';
import { inject, ref, type Ref } from 'vue';
import flyToBuilding from '../../services/flyToBuilding';

const search = ref<any>(null);
const loading = ref(false);
const filteredBuildings = ref<any[]>([]);

const mapType = inject('mapType') as Ref<string>;

const filterBuildings = (text: string) => {
    if (!text || text.length < 1) {
        filteredBuildings.value = [];
        return;
    }
    
    filteredBuildings.value = universityBuildings.buildings.filter(building => 
        building.code.toLowerCase().includes(text.toLowerCase()) ||
        building.name.toLowerCase().includes(text.toLowerCase())
    );
};

const triggerFlyToBuilding = () => {
    flyToBuilding(search.value?.navCode || '', mapType.value);
    search.value = null;
    filteredBuildings.value = [];
}

</script>

<template>
    <v-divider class="mb-5 mt-5"></v-divider>
    <v-autocomplete
        :items="filteredBuildings"
        :item-title="item => item.code + ' - ' + item.name"
        :item-value="item => item.code"
        :label="$t('searchBuilding')"
        :placeholder="$t('searchBuilding')"
        clear-on-select
        v-model="search"
        :loading="loading"
        variant="underlined"
        :width="300"
        class="ml-2 mr-2"
        clearable
        return-object
        @update:search="filterBuildings"
        :no-data-text="$t('startTyping')"
    >

    </v-autocomplete>
    <v-row class="d-flex justify-center mb-1">
        <v-col cols="12" class="text-center">
            <v-btn prepend-icon="mdi-magnify" color="info" variant="outlined" @click="triggerFlyToBuilding">
                {{ $t('searchBuilding') }}
            </v-btn>
        </v-col>
    </v-row>
    <v-divider class="mb-3"></v-divider>
</template>

<style scoped lang="scss">

</style>