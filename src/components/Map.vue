<script lang="ts" setup>
import { onMounted, type Ref, inject } from 'vue';
import { displayMap } from '../services/displayMap';
import ClearRoute from './ClearRoute.vue';
import { clearRoutes } from '../services/clearRoutes';
import LoadingIcon from './LoadingIcon.vue';

const mapType = inject('mapType') as Ref;

onMounted(() => {
    displayMap('cesiumContainer');
});
</script>
<template>
    <div id="cesiumContainer"></div>
    <ClearRoute @click="clearRoutes(mapType)" />
    <LoadingIcon />
</template>
<style scoped>
    #cesiumContainer {
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>