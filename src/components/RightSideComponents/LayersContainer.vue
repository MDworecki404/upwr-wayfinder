<template>
    <v-card>
        <v-card-title>{{ $t('layers')}}</v-card-title>
        <v-card-text>
            <v-radio-group v-model="selectedBasemap">
                <v-radio color="primary" label="OpenStreetMap" value="osm"></v-radio>
                <v-radio color="primary" :label="$t('orto')" value="ortho"></v-radio>
            </v-radio-group>
            <hr>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import {ref} from 'vue';

const selectedBasemap = ref('osm')

</script>

<style scoped lang="scss"></style>