<script setup lang="ts">
import { subtitles } from '../services/presentation';



</script>

<template>
    <v-card color="grey-darken-4" class="subtitles-component pl-2 pr-2 elevation-0 text-white">{{subtitles}}</v-card>
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
    font-size: 1.25rem; // domyślnie (np. ~20px)
}

@media (max-width: 900px) {
    .subtitles-component {
        font-size: 1.1rem;
    }
}

@media (max-width: 600px) {
    .subtitles-component {
        font-size: 0.95rem;
        max-width: 95vw;
        width: 70vw;
        margin-left: 10vw;
    }
}

@media (max-width: 400px) {
    .subtitles-component {
        font-size: 0.8rem;
    }
}
</style>