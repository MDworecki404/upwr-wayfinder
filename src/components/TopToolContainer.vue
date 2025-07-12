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
</script>
<template>
        <v-container class="tool-container" fluid>
            <v-row no-gutters>
                <v-col cols="12" class="d-flex justify-start align-center">
                    <v-btn color="info" rounded="lg" icon="mdi-cog" @click="toggleSettingsComponentVisibility">

                    </v-btn>
                    <v-btn color="info" rounded="lg" :icon="fullscreenStyle" class="ml-2" @click="toggleFullscreen">

                    </v-btn>
                    <v-btn color="info" rounded="lg" icon="mdi-layers" class="ml-2" @click="toggleLayerComponentVisibility">

                    </v-btn>
                    <v-btn color="info" rounded="lg" icon="mdi-map-marker-path" class="ml-2" @click="toggleRoutingComponentVisibility">
                        
                    </v-btn>
                    <v-btn color="info" rounded="lg" :icon="gpsStyle" @click="changeGpsIcon" class="ml-2"></v-btn>
                </v-col>
            </v-row>
        </v-container>
</template>
<style scoped lang="scss">
.tool-container {
    align-items:flex-start;
    width: auto;
}
</style>