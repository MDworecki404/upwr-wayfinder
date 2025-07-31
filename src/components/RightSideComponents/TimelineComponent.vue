<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { setTime } from '../../services/setTime';

const toggleTimelineComponentVisibility = inject('toggleTimelineComponentVisibility') as () => void;

const tickLabels = computed(() => {
    return Array.from({length: 24}, (_, i) => i * 60).map(minutes => {
        const hours = Math.floor(minutes / 60);
        const minutesValue = minutes % 60;
        
        return `${hours.toString().padStart(2, '0')}:${minutesValue.toString().padStart(2, '0')}`;
    });
});

const selectedMinute = ref(12 * 60);

const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const minutesValue = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${minutesValue.toString().padStart(2, '0')}`;
};

const onSliderChange = (minutes: number) => {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    setTime(hour, minute, 0);
};

let interval: any;

const timeAnimation = () => {
    selectedMinute.value = 0;
    interval = setInterval(() => {
        selectedMinute.value += 1;
        if (selectedMinute.value > 1439) {
            selectedMinute.value = 0;
        }
        const hours = Math.floor(selectedMinute.value / 60);
        const minutesValue = selectedMinute.value % 60;
        setTime(hours, minutesValue, 0);
    }, 1000/60);
}
const stopTimeAnimation = () => {
    selectedMinute.value = 12 * 60;
    setTime(12, 0, 0);
    clearInterval(interval);
}

const toggleVisibility = () => {
    toggleTimelineComponentVisibility();
    stopTimeAnimation();
}

</script>

<template>
    <v-card :width="300">
        <v-card-title>{{ $t('timeline') }} <v-icon class="position-absolute right-0 mr-2" style="cursor: pointer;" @click="toggleVisibility">mdi-close</v-icon></v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-row class="d-flex justify-center mt-1">
                <v-col cols="12" class="text-center">
                    {{ $t('selectedTime') }}: {{ formatTime(selectedMinute) }}
                </v-col>
            </v-row>
            <v-slider
                v-model="selectedMinute"
                :min="0"
                :max="1439"
                :step="1"
                @update:model-value="onSliderChange"
                :tick-labels="tickLabels"
                :tick-size="2"
            >
                <template #thumb-label="{ modelValue }">
                    {{ formatTime(modelValue) }}
                </template>
            </v-slider>
            <v-row class="d-flex justify-space-between mt-1">
                <v-col cols="6" class="text-center">
                    <v-btn class="text-caption" color="info" variant="outlined" prepend-icon="mdi-play" @click="timeAnimation">
                        {{ $t('playAnimation') }}
                    </v-btn>
                </v-col>
                <v-col cols="6" class="text-center">
                    <v-btn class="text-caption" color="info" variant="outlined" prepend-icon="mdi-stop" @click="stopTimeAnimation">
                        {{ $t('stopAnimation') }}
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<style scoped lang="scss">

</style>