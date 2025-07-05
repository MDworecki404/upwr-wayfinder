<script setup lang="ts">
import { ref, inject } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();
const selectedLanguage = ref(locale.value);

const changeLanguage = (value: string) => {
    locale.value = value;
}

const toggleSettingsComponentVisibility = inject('toggleSettingsComponentVisibility') as () => void;
</script>

<template>
    <v-card :width="300">
        <v-card-title>{{ $t('settings') }} <v-icon class="position-absolute top-0 right-0 ma-2" style="cursor: pointer;" color="primary" @click="toggleSettingsComponentVisibility">mdi-close</v-icon></v-card-title>
        <v-card-text>
            <v-card-text>{{ $t('language') }}</v-card-text>
            <v-radio-group v-model="selectedLanguage">
                <v-radio :label="$t('pl')" @click="changeLanguage('pl')" value="pl"></v-radio>
                <v-radio :label="$t('en')" @click="changeLanguage('en')" value="en"></v-radio>
            </v-radio-group>
        </v-card-text>
    </v-card>
</template>

<style scoped lang="scss">

</style>