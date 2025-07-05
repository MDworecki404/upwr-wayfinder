<script lang="ts" setup>
import { onMounted } from 'vue';
import { displayMap } from '../services/displayMap';

onMounted(() => {
    displayMap('cesiumContainer');
});
</script>
<template>
    <div id="cesiumContainer"></div>
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