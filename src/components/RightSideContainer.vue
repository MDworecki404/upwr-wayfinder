<template>
  <v-navigation-drawer
    location="right"
    permanent
    width="auto"
    height="100%"
    class="bg-transparent border-0 outline-0 pr-3"
  >
    <v-list>
      <Suspense v-if="isLayerComponentVisible">
        <template #default>
          <LayersContainer />
        </template>
      </Suspense>
      <Suspense v-if="isSettingsComponentVisible">
        <template #default>
          <SettingsContainer />
        </template>
      </Suspense>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { defineAsyncComponent, inject, type Ref } from 'vue';

const LayersContainer = defineAsyncComponent(() =>
  import('./RightSideComponents/LayersContainer.vue')
);
const SettingsContainer = defineAsyncComponent(() =>
  import('./RightSideComponents/SettingsContainer.vue')
);

const isLayerComponentVisible = inject('isLayerComponentVisible') as Ref<boolean>;
const isSettingsComponentVisible = inject('isSettingsComponentVisible') as Ref<boolean>;
</script>

<style scoped>
/* Style komponentu */
</style>