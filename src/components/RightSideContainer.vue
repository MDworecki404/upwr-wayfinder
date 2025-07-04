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
          <LayerComponent />
        </template>
        <template #fallback>
          <div>Loading...</div>
        </template>
      </Suspense>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { defineAsyncComponent, inject, Ref } from 'vue';

const LayerComponent = defineAsyncComponent(() =>
  import('./RightSideComponents/LayersContainer.vue')
);

const isLayerComponentVisible = inject('isLayerComponentVisible') as Ref<boolean>;

</script>

<style scoped>
/* Style komponentu */
</style>