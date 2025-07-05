<template>
  <v-navigation-drawer
    location="right"
    permanent
    width="auto"
    height="100%"
    class="bg-transparent border-0 outline-0 pr-3"
  >
    <v-list>
      <Suspense v-for="component in activeComponents" :key="component.id">
        <template #default>
          <component class="component mb-2" :is="component.component" />
        </template>
      </Suspense>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { defineAsyncComponent, inject, type Ref, computed, ref, watch } from 'vue';

const LayersContainer = defineAsyncComponent(() =>
  import('./RightSideComponents/LayersContainer.vue')
);
const SettingsContainer = defineAsyncComponent(() =>
  import('./RightSideComponents/SettingsContainer.vue')
);
const RoutingContainer = defineAsyncComponent(() =>
  import('./RightSideComponents/RoutingComponent.vue')
);

const isLayerComponentVisible = inject('isLayerComponentVisible') as Ref<boolean>;
const isSettingsComponentVisible = inject('isSettingsComponentVisible') as Ref<boolean>;
const isRoutingComponentVisible = inject('isRoutingComponentVisible') as Ref<boolean>;

// Śledzenie kolejności aktywacji komponentów
const componentOrder = ref<string[]>([]);

// Obserwowanie zmian widoczności komponentów
watch(isLayerComponentVisible, (newVal, oldVal) => {
  if (newVal && !oldVal) {
    // Komponent został aktywowany
    if (!componentOrder.value.includes('layers')) {
      componentOrder.value.push('layers');
    }
  } else if (!newVal && oldVal) {
    // Komponent został dezaktywowany
    const index = componentOrder.value.indexOf('layers');
    if (index > -1) {
      componentOrder.value.splice(index, 1);
    }
  }
});

watch(isSettingsComponentVisible, (newVal, oldVal) => {
  if (newVal && !oldVal) {
    // Komponent został aktywowany
    if (!componentOrder.value.includes('settings')) {
      componentOrder.value.push('settings');
    }
  } else if (!newVal && oldVal) {
    // Komponent został dezaktywowany
    const index = componentOrder.value.indexOf('settings');
    if (index > -1) {
      componentOrder.value.splice(index, 1);
    }
  }
});

watch(isRoutingComponentVisible, (newVal, oldVal) => {
  if (newVal && !oldVal) {
    // Komponent został aktywowany
    if (!componentOrder.value.includes('routing')) {
      componentOrder.value.push('routing');
    }
  } else if (!newVal && oldVal) {
    // Komponent został dezaktywowany
    const index = componentOrder.value.indexOf('routing');
    if (index > -1) {
      componentOrder.value.splice(index, 1);
    }
  }
});

// Tablica aktywnych komponentów w kolejności ich aktywacji
const activeComponents = computed(() => {
  const components = [];
  
  // Iterujemy przez kolejność aktywacji
  for (const componentId of componentOrder.value) {
    if (componentId === 'layers' && isLayerComponentVisible.value) {
      components.push({
        id: 'layers',
        component: LayersContainer
      });
    } else if (componentId === 'settings' && isSettingsComponentVisible.value) {
      components.push({
        id: 'settings',
        component: SettingsContainer
      });
    } else if (componentId === 'routing' && isRoutingComponentVisible.value) {
      components.push({
        id: 'routing',
        component: RoutingContainer
      });
    }
  }
  
  return components;
});
</script>

<style scoped lang="scss">

  .v-navigation-drawer {
    pointer-events: none;
  }

.component {
  pointer-events: auto;
}
</style>