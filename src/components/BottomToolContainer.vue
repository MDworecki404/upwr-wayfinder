<script setup lang="ts">
import { inject, shallowRef, watch } from 'vue';
import { flyToHome } from '../services/flyToHome';

const open = shallowRef(false)
const fabPosition = shallowRef('absolute')
const menuLocation = shallowRef('right center') as any
const fabLocation = shallowRef('left bottom')
const transition = shallowRef('slide-x-reverse')

const toggleTimelineComponentVisibility = inject('toggleTimelineComponentVisibility') as () => void;
const togglePresentationComponentVisibility = inject('togglePresentationComponentVisibility') as () => void;


const reopen = () => {
    open.value = true
}


watch(menuLocation, reopen)
watch(transition, reopen)
watch(fabLocation, () => open.value = false)
watch(fabPosition, () => open.value = false)
</script>

<template>
<div class="fab-column">
    <v-fab
        icon="mdi-home"
        color="info"
        @click="flyToHome"
    />
    <v-fab 
        icon="mdi-presentation-play" 
        color="info"
        @click="togglePresentationComponentVisibility"
    />
    <v-fab 
        icon="mdi-dots-vertical" 
        color="info"
        @click="open = !open"
    >
        <v-icon>{{ open ? 'mdi-close' : 'mdi-dots-vertical' }}</v-icon>
        <v-speed-dial
        v-model="open"
        :location="menuLocation"
        :transition="transition"
        activator="parent"  
        >
        <v-btn key="1" color="info" icon @click="toggleTimelineComponentVisibility">
            <v-icon size="24">mdi-clock-outline</v-icon>
        </v-btn>
        </v-speed-dial>
    </v-fab>
    <!-- Dodawaj kolejne <v-fab> tutaj -->
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
</style>