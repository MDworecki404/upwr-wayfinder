<script setup lang="ts">
import { ref, provide, defineAsyncComponent, type Ref } from 'vue';
import { checkCameraPosition } from './services/forTest/checkCameraPosition';
import startConfig from './data/startConfig.json';

const Map = defineAsyncComponent(() => import('./components/Map.vue'));
const TopToolContainer = defineAsyncComponent(() => import('./components/TopToolContainer.vue'));
const RightSideContainer = defineAsyncComponent(() => import('./components/RightSideContainer.vue'));
const HelloDialog = defineAsyncComponent(() => import('./components/HelloDialog.vue'));
const BottomToolContainer = defineAsyncComponent(() => import('./components/BottomToolContainer.vue'));
const SubtitlesComponent = defineAsyncComponent(() => import('./components/SubtitlesComponent.vue'));
const DescriptionsDialog = defineAsyncComponent(() => import('./components/DescriptionsDialog.vue'));
const isLayerComponentVisible = ref(false);
const isDescriptionsDialogVisible = ref(false);

const toggleDescriptionsDialogVisibility = () => {
  isDescriptionsDialogVisible.value = !isDescriptionsDialogVisible.value;
};

provide('isDescriptionsDialogVisible', isDescriptionsDialogVisible);
provide('toggleDescriptionsDialogVisibility', toggleDescriptionsDialogVisibility);

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

const isDynamicServiceComponentVisible = ref(false)
const toggleDynamicServiceComponentVisible = () => {
  isDynamicServiceComponentVisible.value = !isDynamicServiceComponentVisible.value
}

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
const expandedWMS = ref([0])
const expandedWMTS = ref([0])


const selectedLayer = ref({
    google3dtiles: false,
    osm3dtiles: false,
    lod1buildings: false,
    upwrbuildings: false,
    dem: true
})

const mapType = ref('3d')

const font = ref('Roboto')

const isGpsEnabled = ref(false)
const gpsStyle = ref('mdi-crosshairs')

const isUpwrBuildingsEnabled = ref(selectedLayer.value.upwrbuildings);
const isGoogle3dtilesEnabled = ref(selectedLayer.value.google3dtiles);
const isOsm3dtilesEnabled = ref(selectedLayer.value.osm3dtiles);
const isLod1BuildingsEnabled = ref(selectedLayer.value.lod1buildings);
const isDemEnabled = ref(selectedLayer.value.dem);

const hideAllPanels = () => {
        if (isLayerComponentVisible.value) {
            toggleLayerComponentVisibility();
        }
        if (isSettingsComponentVisible.value) {
            toggleSettingsComponentVisibility();
        }
        if (isRoutingComponentVisible.value) {
            toggleRoutingComponentVisibility();
        }
        if (isUpwrBuildingsLegendVisible.value) {
            toggleUpwrBuildingsLegendVisibility();
        }
        if (isPopUpVisible.value) {
            hidePopUp();
        }
        if (isTimelineComponentVisible.value) {
            toggleTimelineComponentVisibility();
        }
        if (isPresentationComponentVisible.value) {
            togglePresentationComponentVisibility();
        }
        if (isDynamicServiceComponentVisible.value) {
            toggleDynamicServiceComponentVisible()
        }
    }


// TEMPORARY WMS
const tempWMSArray = ref([]) as Ref<object[]>
provide('tempWMSArray', tempWMSArray)
//TEMPORARY WMS
// TEMPORARY WMTS
const tempWMTSArray = ref([]) as Ref<object[]>
provide('tempWMTSArray', tempWMTSArray)
//TEMPORARY WMTS

provide('hideAllPanels', hideAllPanels);

provide('mapType', mapType)
provide('isGpsEnabled', isGpsEnabled)
provide('gpsStyle', gpsStyle)


provide('isUpwrBuildingsEnabled', isUpwrBuildingsEnabled);
provide('isGoogle3dtilesEnabled', isGoogle3dtilesEnabled);
provide('isOsm3dtilesEnabled', isOsm3dtilesEnabled);
provide('isLod1BuildingsEnabled', isLod1BuildingsEnabled);
provide('isDemEnabled', isDemEnabled);
provide('isLayerComponentVisible', isLayerComponentVisible);
provide('toggleLayerComponentVisibility', toggleLayerComponentVisibility);
provide('isSettingsComponentVisible', isSettingsComponentVisible);
provide('toggleSettingsComponentVisibility', toggleSettingsComponentVisibility);
provide('isRoutingComponentVisible', isRoutingComponentVisible);
provide('toggleRoutingComponentVisibility', toggleRoutingComponentVisibility);
provide('isDynamicServiceComponentVisible', isDynamicServiceComponentVisible)
provide('toggleDynamicServiceComponentVisible', toggleDynamicServiceComponentVisible)

// Provide dla stanu warstw
provide('selectedBasemap', selectedBasemap);
provide('expandedBasemap', expandedBasemap);
provide('expandedLayers', expandedLayers);
provide('expandedWMS', expandedWMS)
provide('expandedWMTS', expandedWMTS)
provide('selectedLayer', selectedLayer);
provide('isUpwrBuildingsLegendVisible', isUpwrBuildingsLegendVisible);
provide('toggleUpwrBuildingsLegendVisibility', toggleUpwrBuildingsLegendVisibility);
provide('isPopUpVisible', isPopUpVisible);
provide('showPopUp', showPopUp);
provide('hidePopUp', hidePopUp);
provide('font', font);
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
            <DescriptionsDialog v-if="isDescriptionsDialogVisible" />
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

