<script setup lang="ts">
import { ref, provide, defineAsyncComponent } from 'vue';
import { checkCameraPosition } from './services/forTest/checkCameraPosition';
import startConfig from './data/startConfig.json';

const Map = defineAsyncComponent(() => import('./components/Map.vue'));
const TopToolContainer = defineAsyncComponent(() => import('./components/TopToolContainer.vue'));
const RightSideContainer = defineAsyncComponent(() => import('./components/RightSideContainer.vue'));
const HelloDialog = defineAsyncComponent(() => import('./components/HelloDialog.vue'));
const BottomToolContainer = defineAsyncComponent(() => import('./components/BottomToolContainer.vue'));
const SubtitlesComponent = defineAsyncComponent(() => import('./components/SubtitlesComponent.vue'));
  
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

const isUpwrBuildingsLegendVisible = ref(false);

const toggleUpwrBuildingsLegendVisibility = () => {
  isUpwrBuildingsLegendVisible.value = !isUpwrBuildingsLegendVisible.value;
};

const isTimelineComponentVisible = ref(false);

const toggleTimelineComponentVisibility = () => {
  isTimelineComponentVisible.value = !isTimelineComponentVisible.value;
};

const isPresentationComponentVisible = ref(false);
const togglePresentationComponentVisibility = () => {
  isPresentationComponentVisible.value = !isPresentationComponentVisible.value;
};

const isPopUpVisible = ref(false);

  const showPopUp = () => {
  isPopUpVisible.value = true;
};

const hidePopUp = () => {
  isPopUpVisible.value = false;
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

const mapType = ref('3d')

const isGpsEnabled = ref(false)
const gpsStyle = ref('mdi-crosshairs')

provide('mapType', mapType)
provide('isGpsEnabled', isGpsEnabled)
provide('gpsStyle', gpsStyle)

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
provide('isUpwrBuildingsLegendVisible', isUpwrBuildingsLegendVisible);
provide('toggleUpwrBuildingsLegendVisibility', toggleUpwrBuildingsLegendVisibility);
provide('isPopUpVisible', isPopUpVisible);
provide('showPopUp', showPopUp);
provide('hidePopUp', hidePopUp);

provide('isTimelineComponentVisible', isTimelineComponentVisible);
provide('toggleTimelineComponentVisibility', toggleTimelineComponentVisibility);
provide('isPresentationComponentVisible', isPresentationComponentVisible);
provide('togglePresentationComponentVisibility', togglePresentationComponentVisibility);


const triggerCheckCameraPosition = () => {
  checkCameraPosition();
}
</script>

<template>
    <v-app>
        <v-main>
            <HelloDialog />
            <Map />
            <TopToolContainer />
            <RightSideContainer />
            <BottomToolContainer />
            <v-btn v-if="startConfig.isDev" @click="triggerCheckCameraPosition">Check Camera Position</v-btn>
            <SubtitlesComponent />
        </v-main>
    </v-app>
</template>

<style scoped>

</style>

