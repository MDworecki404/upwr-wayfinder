<script lang="ts" setup>
import { onMounted } from 'vue';
import { displayMap } from '../services/displayMap';
import ClearRoute from './ClearRoute.vue';
import { clearRoutes } from '../services/clearRoutes';
import LoadingIcon from './LoadingIcon.vue';

onMounted(() => {
    displayMap('cesiumContainer');
});
</script>
<template>
    <div id="cesiumContainer"></div>
    <ClearRoute @click="clearRoutes" />
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