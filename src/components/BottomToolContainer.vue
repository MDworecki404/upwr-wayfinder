<script setup lang="ts">
import { inject, shallowRef, watch, type Ref } from 'vue';
import { flyToHome } from '../services/flyToHome';
import { changeMapType } from '../services/changeMapType';
import { clearRoutes } from '../services/clearRoutes';
import { stopTracking } from '../services/userLocation';
import { map } from '../services/olMap';
import { viewer } from '../services/displayMap';
import * as Cesium from 'cesium';
import { registerDemWroclaw } from '../services/layers';


const open = shallowRef(false)
const fabPosition = shallowRef('absolute')
const menuLocation = shallowRef('right center') as any
const fabLocation = shallowRef('left bottom')
const transition = shallowRef('slide-x-reverse')

const toggleTimelineComponentVisibility = inject('toggleTimelineComponentVisibility') as () => void;
const togglePresentationComponentVisibility = inject('togglePresentationComponentVisibility') as () => void;
const hideAllPanels = inject('hideAllPanels') as () => void;

const reopen = () => {
    open.value = true
}

const mapType = inject('mapType') as Ref<string>
const isGpsEnabled = inject('isGpsEnabled') as Ref<boolean>
const gpsStyle = inject('gpsStyle') as Ref<string>
const selectedBasemap = inject('selectedBasemap') as Ref<string>
const selectedLayer = inject('selectedLayer') as Ref<any>
const isUpwrBuildingsEnabled = inject('isUpwrBuildingsEnabled') as Ref<boolean>
const isDemEnabled = inject('isDemEnabled') as Ref<boolean>

const triggerChangeMapType = () => {
    if (mapType.value === '2d') {
        // Zatrzymaj śledzenie w poprzednim trybie (2D)
        stopTracking('2d')
        mapType.value = '3d'
        changeMapType(mapType.value)
        clearRoutes(mapType.value)
        isGpsEnabled.value = false
        gpsStyle.value = 'mdi-crosshairs'
        selectedBasemap.value = 'osm'
        selectedLayer.value.google3dtiles = false
        selectedLayer.value.osm3dtiles = false
        selectedLayer.value.lod1buildings = false
        selectedLayer.value.upwrbuildings = false
        isUpwrBuildingsEnabled.value = false
        isDemEnabled.value = true
        registerDemWroclaw(true)
        viewer?.screenSpaceEventHandler.setInputAction(() => {
        hideAllPanels();
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    } else {
        // Zatrzymaj śledzenie w poprzednim trybie (3D)
        stopTracking('3d')
        mapType.value = '2d'
        changeMapType(mapType.value)
        clearRoutes(mapType.value)
        isGpsEnabled.value = false
        gpsStyle.value = 'mdi-crosshairs'
        selectedBasemap.value = 'osm'
        selectedLayer.value.google3dtiles = false
        selectedLayer.value.osm3dtiles = false
        selectedLayer.value.lod1buildings = false
        selectedLayer.value.upwrbuildings = false
        isUpwrBuildingsEnabled.value = false
        isDemEnabled.value = false

        map.on('click', () => {
            hideAllPanels();
        });
    }
}

watch(menuLocation, reopen)
watch(transition, reopen)
watch(fabLocation, () => open.value = false)
watch(fabPosition, () => open.value = false)
</script>

<template>
<div class="fab-column">
    <v-tooltip location="right" :text="$t('changeMapType')">
        <template v-slot:activator="{ props }">
            <v-fab
                v-bind="props"
                size="small"
                rounded="lg"
                :icon="mapType === '3d' ? 'mdi-video-2d' : 'mdi-video-3d'"
                @click="triggerChangeMapType"
            />
        </template>
    </v-tooltip>

    <v-tooltip location="right" :text="$t('flyToHome')">
        <template v-slot:activator="{ props }">
            <v-fab
                v-bind="props"
                size="small"
                rounded="lg"
                icon="mdi-home"
                @click="flyToHome(mapType)"
            />
        </template>
    </v-tooltip>

    <v-tooltip
        v-if="mapType === '3d'"
        location="right"
        :text="$t('togglePresentation')"
    >
        <template v-slot:activator="{ props }">
            <v-fab
                v-bind="props"
                size="small"
                rounded="lg"
                icon="mdi-presentation-play"
                @click="togglePresentationComponentVisibility"
            />
        </template>
    </v-tooltip>
    <v-fab
        size="small"
        rounded="lg"
        icon="mdi-dots-vertical"
        @click="open = !open"
    >
        <v-icon>{{ open ? 'mdi-close' : 'mdi-dots-vertical' }}</v-icon>
        <v-speed-dial
            v-model="open"
            :location="menuLocation"
            :transition="transition"
            activator="parent"
        >
            <v-tooltip location="top left" :text="$t('timeline')">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" v-if="mapType === '3d'" key="1" icon @click="toggleTimelineComponentVisibility">
                        <v-icon color="#1976D2" size="24">mdi-clock-outline</v-icon>
                    </v-btn>
                </template>
            </v-tooltip>
        </v-speed-dial>
    </v-fab>
</div>
</template>

<style lang="scss" scoped>
.fab-column {
    position: absolute;
    left: 0;
    bottom: 0;
    margin: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px; // odstęp między przyciskami
    z-index: 1000;
    margin-bottom: 50px;
}

// Zwiększenie rozmiaru ikon w przyciskach
.fab-column :deep(.v-fab) {
    .v-icon {
        font-size: 1.5rem !important;
        color: #1976D2 !important;
    }
}

// Zwiększenie rozmiaru ikon w speed dial
.fab-column :deep(.v-speed-dial) {
    .v-btn .v-icon {
        font-size: 1.5rem !important;
    }
}
</style>