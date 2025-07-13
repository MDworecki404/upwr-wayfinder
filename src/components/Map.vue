<script lang="ts" setup>
import { onMounted, type Ref, inject} from 'vue';
import { displayMap } from '../services/displayMap';
import ClearRoute from './ClearRoute.vue';
import { clearRoutes } from '../services/clearRoutes';
import LoadingIcon from './LoadingIcon.vue';
import { viewer } from '../services/displayMap';
import * as Cesium from 'cesium';

const mapType = inject('mapType') as Ref;

const hideAllPanels = inject('hideAllPanels') as () => void;

onMounted(() => {
    displayMap('cesiumContainer');
    viewer?.screenSpaceEventHandler.setInputAction(() => {
        hideAllPanels();
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
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