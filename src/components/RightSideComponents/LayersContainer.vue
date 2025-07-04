<script setup lang="ts">
import {ref} from 'vue';

const selectedBasemap = ref('osm')
const expandedBasemap = ref([0])
const expandedLayers = ref([0])

</script>

<template>
    <v-card :width="300">
        <v-card-title>{{ $t('layers')}}</v-card-title>
        <v-card-text class="pa-0">
            <v-expansion-panels class="b-0 outline-0" focusable v-model="expandedBasemap">
                <v-expansion-panel variant="accordion" >
                    <v-expansion-panel-title>{{ $t('basemaps')}}</v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-radio-group v-model="selectedBasemap">
                            <v-radio color="primary" label="OpenStreetMap" value="osm"></v-radio>
                            <v-radio color="primary" :label="$t('orto')" value="ortho"></v-radio>
                        </v-radio-group>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
            <v-expansion-panels class="b-0 outline-0" focusable v-model="expandedLayers">
                <v-expansion-panel variant="accordion">
                    <v-expansion-panel-title>{{ $t('layers')}}</v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-checkbox color="info" :label="$t('google3dtiles')"></v-checkbox>
                        <v-checkbox color="info" :label="$t('osm3dtiles')"></v-checkbox>
                        <v-checkbox color="info" :label="$t('lod1buildings')"></v-checkbox>
                        <v-checkbox color="info" :label="$t('upwrbuildings')"></v-checkbox>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
            <hr>
        </v-card-text>
    </v-card>
</template>

<style scoped lang="scss">
.v-checkbox{
    margin-bottom: -25px;
}
</style>