<script lang="ts" setup>
import { ref, inject, onMounted, onUnmounted, type Ref } from 'vue';


const isGpsEnabled = inject('isGpsEnabled') as Ref<boolean>;
const gpsStyle = inject('gpsStyle') as Ref<string>;
const mapType = inject('mapType') as Ref<string>;
import { userPositionFollow } from '../services/userLocation';

const changeGpsIcon = () => {
    isGpsEnabled.value = !isGpsEnabled.value;
    gpsStyle.value = isGpsEnabled.value ? 'mdi-crosshairs-gps' : 'mdi-crosshairs';
    userPositionFollow(mapType.value);
};

const fullscreenStyle = ref('mdi-fullscreen');

const toggleFullscreen = () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
};

const updateFullscreenIcon = () => {
    if (document.fullscreenElement) {
        fullscreenStyle.value = 'mdi-fullscreen-exit';
    } else {
        fullscreenStyle.value = 'mdi-fullscreen';
    }
};

onMounted(() => {
    document.addEventListener('fullscreenchange', updateFullscreenIcon);
});
    
onUnmounted(() => {
    document.removeEventListener('fullscreenchange', updateFullscreenIcon);
});

const toggleLayerComponentVisibility = inject('toggleLayerComponentVisibility') as () => void;
const toggleSettingsComponentVisibility = inject('toggleSettingsComponentVisibility') as () => void;
const toggleRoutingComponentVisibility = inject('toggleRoutingComponentVisibility') as () => void;
const toggleDescriptionsDialogVisibility = inject('toggleDescriptionsDialogVisibility') as () => void;
</script>
<template>
        <v-container class="tool-container" fluid>
            <v-row no-gutters>
                <v-col cols="12" class="d-flex justify-start align-start align-sm-center flex-column flex-sm-row align-items-start">
                    <v-btn size="small" rounded="lg" icon="mdi-tune" @click="toggleSettingsComponentVisibility" class="mb-2 mb-sm-0">

                    </v-btn>
                    <v-btn size="small" rounded="lg" icon="mdi-information-outline" class="ml-sm-2 mb-2 mb-sm-0" @click="toggleDescriptionsDialogVisibility">

                    </v-btn>
                    <v-btn size="small" rounded="lg" :icon="fullscreenStyle" class="ml-sm-2 mb-2 mb-sm-0" @click="toggleFullscreen">

                    </v-btn>
                    <v-btn size="small" rounded="lg" icon="mdi-layers-outline" class="ml-sm-2 mb-2 mb-sm-0" @click="toggleLayerComponentVisibility">

                    </v-btn>
                    <v-btn size="small" rounded="lg" icon="mdi-map-marker-path" class="ml-sm-2 mb-2 mb-sm-0" @click="toggleRoutingComponentVisibility">
                        
                    </v-btn>
                    <v-btn size="small" rounded="lg" :icon="gpsStyle" @click="changeGpsIcon" class="ml-sm-2 mb-2 mb-sm-0"></v-btn>
                </v-col>
            </v-row>
        </v-container>
</template>
<style scoped lang="scss">
.tool-container {
    align-items:flex-start;
    width: auto;
}

// Zwiększenie rozmiaru ikon w przyciskach
.tool-container :deep(.v-btn) {
    .v-icon {
        font-size: 1.5rem !important;
        color: #1976D2 !important;
    }
}
</style>