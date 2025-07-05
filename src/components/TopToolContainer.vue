<script lang="ts" setup>
import { ref, inject, onMounted } from 'vue';


const isGpsEnabled = ref(false);
const gpsStyle = ref('mdi-crosshairs')
import { userPositionFollow, setGpsStateCallback } from '../services/userLocation';

const changeGpsIcon = () => {
    isGpsEnabled.value = !isGpsEnabled.value;
    gpsStyle.value = isGpsEnabled.value ? 'mdi-crosshairs-gps' : 'mdi-crosshairs';
    userPositionFollow();
};

// Funkcja do aktualizacji stanu GPS z zewnątrz
const updateGpsState = (isEnabled: boolean) => {
    isGpsEnabled.value = isEnabled;
    gpsStyle.value = isEnabled ? 'mdi-crosshairs-gps' : 'mdi-crosshairs';
};

// Rejestracja callbacka przy montowaniu komponentu
onMounted(() => {
    setGpsStateCallback(updateGpsState);
});



const toggleLayerComponentVisibility = inject('toggleLayerComponentVisibility') as () => void;
const toggleSettingsComponentVisibility = inject('toggleSettingsComponentVisibility') as () => void;
const toggleRoutingComponentVisibility = inject('toggleRoutingComponentVisibility') as () => void;
</script>
<template>
        <v-container class="tool-container" fluid>
            <v-row no-gutters>
                <v-col cols="12" class="d-flex justify-start align-center">
                    <v-btn color="info" icon="mdi-cog" @click="toggleSettingsComponentVisibility"></v-btn>
                    <v-btn color="info" icon="mdi-layers" class="ml-2" @click="toggleLayerComponentVisibility"></v-btn>
                    <v-btn color="info" icon="mdi-map-marker-path" class="ml-2" @click="toggleRoutingComponentVisibility"></v-btn>
                    <v-btn color="info" :icon="gpsStyle" @click="changeGpsIcon" class="ml-2"></v-btn>
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