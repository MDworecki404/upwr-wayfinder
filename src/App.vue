<script setup lang="ts">
import { ref, provide, defineAsyncComponent } from 'vue';

const Map = defineAsyncComponent(() => import('./components/Map.vue'));
const TopToolContainer = defineAsyncComponent(() => import('./components/TopToolContainer.vue'));
const RightSideContainer = defineAsyncComponent(() => import('./components/RightSideContainer.vue'));
const HelloDialog = defineAsyncComponent(() => import('./components/HelloDialog.vue'));

const isLayerComponentVisible = ref(false);

const toggleLayerComponentVisibility = () => {
  isLayerComponentVisible.value = !isLayerComponentVisible.value;
};

const isSettingsComponentVisible = ref(false);

const toggleSettingsComponentVisibility = () => {
  isSettingsComponentVisible.value = !isSettingsComponentVisible.value;
};

const isRoutingComponentVisible = ref(false);

const toggleRoutingComponentVisibility = () => {
  isRoutingComponentVisible.value = !isRoutingComponentVisible.value;
};


// Stan warstw - przeniesiony z LayersContainer
const selectedBasemap = ref('osm')
const expandedBasemap = ref([0])
const expandedLayers = ref([0])

const selectedLayer = ref({
    google3dtiles: false,
    osm3dtiles: false,
    lod1buildings: false,
    upwrbuildings: false
})

provide('isLayerComponentVisible', isLayerComponentVisible);
provide('toggleLayerComponentVisibility', toggleLayerComponentVisibility);
provide('isSettingsComponentVisible', isSettingsComponentVisible);
provide('toggleSettingsComponentVisibility', toggleSettingsComponentVisibility);
provide('isRoutingComponentVisible', isRoutingComponentVisible);
provide('toggleRoutingComponentVisibility', toggleRoutingComponentVisibility);

// Provide dla stanu warstw
provide('selectedBasemap', selectedBasemap);
provide('expandedBasemap', expandedBasemap);
provide('expandedLayers', expandedLayers);
provide('selectedLayer', selectedLayer);
</script>

<template>
    <v-app>
        <v-main>
            <HelloDialog />
            <Map />
            <TopToolContainer />
            <RightSideContainer />
        </v-main>
    </v-app>
</template>

<style scoped>

</style>

