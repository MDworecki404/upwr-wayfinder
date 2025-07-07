<script setup lang="ts">
import universityBuildings from '../../data/universityBuildings.json';
import { ref } from 'vue';
import { flyToBuilding } from '../../services/flyToBuilding';

const search = ref('');
const loading = ref(false);


</script>

<template>
    <v-divider class="mb-3"></v-divider>
    <v-autocomplete
        :items="universityBuildings.buildings"
        :item-title="item => item.code + ' - ' + item.name"
        :item-value="item => item.navCode"
        :label="$t('searchBuilding')"
        :placeholder="$t('searchBuilding')"
        v-model="search"
        :loading="loading"
        variant="underlined"
        :width="300"
        class="ml-2 mr-2"
    >

    </v-autocomplete>
    <v-row class="d-flex justify-center mb-1">
        <v-col cols="12" class="text-center">
            <v-btn color="info" @click="flyToBuilding(search)">
                {{ $t('searchBuilding') }}
            </v-btn>
        </v-col>
    </v-row>
    <v-divider class="mb-3"></v-divider>
</template>

<style scoped lang="scss">

</style>