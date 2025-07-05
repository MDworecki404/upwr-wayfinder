<script setup lang="ts">
import { ref } from 'vue';

const dialog = ref(true);   

import { useI18n } from 'vue-i18n';

const { locale} = useI18n();
const selectedLanguage = ref(locale.value);

const changeLanguage = (value: string) => {
    locale.value = value;
}
</script>

<template>
    <v-dialog v-model="dialog" width="500">
        <v-card>
            <v-radio-group class="d-flex justify-center align-center" v-model="selectedLanguage" inline>
                <v-radio label="Polski" @click="changeLanguage('pl')" value="pl"></v-radio>
                <v-radio label="English" @click="changeLanguage('en')" value="en"></v-radio>
            </v-radio-group>
            <v-divider></v-divider>
            <img class="mx-auto mt-5 mb-5" src="../assets/logo_Upwr_wayfinder_z_tlem.png" alt="UPWr Wayfinder" :width="100">
            <v-card-title>{{$t('welcome')}}</v-card-title>
            <v-card-text>{{$t('welcomeText')}}</v-card-text>
            
            <v-card-actions>
                <v-btn color="primary" @click="dialog = false">{{$t('close')}}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>