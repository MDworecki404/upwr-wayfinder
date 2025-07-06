<script setup lang="ts">
import { ref, shallowRef, watch } from 'vue';

const open = shallowRef(false)
const fabPosition = shallowRef('absolute')
const menuLocation = shallowRef('right center') as any
const fabLocation = shallowRef('left bottom')
const transition = shallowRef('slide-x-reverse')


const reopen = () => {
    open.value = true
}


watch(menuLocation, reopen)
watch(transition, reopen)
watch(fabLocation, () => open.value = false)
watch(fabPosition, () => open.value = false)
</script>

<template>
    <v-fab 
    icon="mdi-dots-vertical" 
    color="info"
    class="position-absolute bottom-0 left-0 ma-10 ml-3"
    >
        <v-icon>{{ open ? 'mdi-close' : 'mdi-dots-vertical' }}</v-icon>
        <v-speed-dial
        v-model="open"
        :location="menuLocation"
        :transition="transition"
        activator="parent"  
        >
        <v-btn key="1" color="info" icon>
            <v-icon size="24">mdi-clock-outline</v-icon>
        </v-btn>
        </v-speed-dial>
    </v-fab>
</template>

<style lang="scss" scoped>
</style>