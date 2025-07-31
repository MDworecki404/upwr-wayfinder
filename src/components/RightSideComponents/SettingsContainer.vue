<script setup lang="ts">
import { ref, inject, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const selectedLanguage = ref(locale.value);
const selectedFont = inject('font') as Ref<string>;
const changeLanguage = (value: string) => {
    locale.value = value;
}

const toggleSettingsComponentVisibility = inject('toggleSettingsComponentVisibility') as () => void;

const changeFont = (value: string) => {
    selectedFont.value = value;

    const vApp = document.querySelector('.v-application') as HTMLElement;
    if (vApp) {
        vApp.style.setProperty('--v-font-family', `'${value}', sans-serif`);
    }

    document.documentElement.style.setProperty('--v-font-family', `'${value}', sans-serif`);
}
</script>   

<template>
    <v-card :width="300">
        <v-card-title>{{ $t('settings') }} <v-icon class="position-absolute top-0 right-0 ma-2" style="cursor: pointer;" @click="toggleSettingsComponentVisibility">mdi-close</v-icon></v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-card-text class="text-button">{{ $t('language') }}</v-card-text>
            <v-radio-group color="info" v-model="selectedLanguage">
                <v-radio label="Polski" @click="changeLanguage('pl')" value="pl"></v-radio>
                <v-radio label="English" @click="changeLanguage('en')" value="en"></v-radio>
            </v-radio-group>
            <v-divider></v-divider>
            <v-card-text class="text-button">{{ $t('font') }}</v-card-text>
            <v-radio-group>
                <v-select 
                variant="underlined" 
                :items="['Roboto', 'Roboto Slab', 'Libre Franklin', 'Funnel Display', 'Lato']"
                v-model="selectedFont"
                @update:model-value="changeFont"
                >

                </v-select>
            </v-radio-group>
        </v-card-text>
    </v-card>
</template>

<style scoped lang="scss">

</style>