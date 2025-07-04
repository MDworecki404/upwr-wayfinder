<script setup lang="ts">
import { ref, provide } from 'vue';
import Map from './components/Map.vue';
import TopToolContainer from './components/TopToolContainer.vue';
import RightSideContainer from './components/RightSideContainer.vue';

const isLayerComponentVisible = ref(false);

const toggleLayerComponentVisibility = () => {
  isLayerComponentVisible.value = !isLayerComponentVisible.value;
};

const isSettingsComponentVisible = ref(false);

const toggleSettingsComponentVisibility = () => {
  isSettingsComponentVisible.value = !isSettingsComponentVisible.value;
};

provide('isLayerComponentVisible', isLayerComponentVisible);
provide('toggleLayerComponentVisibility', toggleLayerComponentVisibility);
provide('isSettingsComponentVisible', isSettingsComponentVisible);
provide('toggleSettingsComponentVisibility', toggleSettingsComponentVisibility);
</script>

<template>
    <v-app>
        <v-main>
            <Map />
            <TopToolContainer />
        </v-main>
        <RightSideContainer />
    </v-app>
</template>

<style scoped>

</style>

