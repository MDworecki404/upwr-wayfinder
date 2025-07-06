<script setup lang="ts">
import {ref} from 'vue';

const popUpVisible = ref(false);
const popUpInfo = ref({
    title: '',
    description: ''
});

</script>

<template>
    <v-card v-if="popUpVisible" class="popup-panel position-absolute">
        <v-card-title class="text-h6">Informacje o obiekcie</v-card-title>
            <v-card-text>
                <b>{{ popUpInfo.title }}</b> <br><br>
                <p v-html="popUpInfo.description"></p>
            </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="popUpVisible = false">Zamknij</v-btn>
        </v-card-actions>
    </v-card>
</template>

<style scoped>  
.popup-panel {
    width: 300px;
    height: min-content;
    top: 25px;
    left: 25px;
    z-index: 1000;
}

p{
    overflow-y: scroll;
    max-height: 400px;
}

</style>