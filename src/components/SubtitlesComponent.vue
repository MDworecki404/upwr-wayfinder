<script setup lang="ts">
import { subtitles } from '../services/presentation';



</script>

<template>
    <v-card color="grey-darken-4" class="subtitles-component pl-2 pr-2 elevation-0 text-white text-h6">{{subtitles}}</v-card>
</template>

<style scoped lang="scss">
.subtitles-component {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    margin-bottom: 10px;
    outline: none;
    border: none;
    max-width: 50vw;
    height: min-content;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
</style>