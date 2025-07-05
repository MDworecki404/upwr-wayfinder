<script lang="ts" setup>
import { inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import universityBuildings from '../../data/universityBuildings.json';
import  routeFinder  from '../../services/RouteFinder/routeFinder';
import {userRouteFinder} from '../../services/RouteFinder/userRouteFinder';

const { t } = useI18n();

const buildings = ref(universityBuildings.buildings);
const selectedStartBuilding = ref();
const selectedEndBuilding = ref();
const selectedMode = ref('foot');

const toggleRoutingComponentVisibility = inject('toggleRoutingComponentVisibility') as () => void;

const findRoute = () => {
    routeFinder(selectedStartBuilding.value, selectedEndBuilding.value, selectedMode.value);
}

const findUserRoute = () => {
    userRouteFinder(selectedEndBuilding.value, selectedMode.value);
}

const selectedRouteType = ref(t('toBuilding'));
</script>

<template>
    <v-card :width="300">
        <v-card-title class="bg-blue-lighten-1">{{ $t('routing') }} <v-icon class="position-absolute top-0 right-0 ma-2" style="cursor: pointer;" @click="toggleRoutingComponentVisibility">mdi-close</v-icon></v-card-title>
        <v-select
        class="ma-3" 
        :items="[$t('toBuilding'), $t('fromBuildingToBuilding')]" 
        v-model="selectedRouteType"
        variant="underlined"
        >
        </v-select>
        <v-divider class="my-2"></v-divider>
        <v-card-text v-if="selectedRouteType === $t('toBuilding')">
            <v-select
            class="ma-2"
            :label="$t('endBuilding')"
            :items="buildings"
            item-value="code"
            :item-title="item => `${item.code} - ${item.name}`"
            v-model="selectedEndBuilding"
            variant="underlined"
            />
            <v-btn-toggle 
            color="info"
            class="d-flex justify-center"
            v-model="selectedMode"
            variant="outlined"
            >
                <v-btn v-model="selectedMode" value="foot" @click="selectedMode = 'foot'">
                    <v-icon>mdi-walk</v-icon>   
                </v-btn>
            
                <v-btn v-model="selectedMode" value="bike" @click="selectedMode = 'bike'"> 
                    <v-icon>mdi-bike</v-icon>
                </v-btn>
            
                <v-btn v-model="selectedMode" value="car" @click="selectedMode = 'car'">
                    <v-icon>mdi-car</v-icon>
                </v-btn>
            </v-btn-toggle>
            <v-btn 
            color="info" 
            @click="findUserRoute"
            class="mt-5 "
            >{{ $t('findRoute') }}</v-btn>
        </v-card-text>
        <v-card-text v-if="selectedRouteType === $t('fromBuildingToBuilding')">
            <v-select
            class="ma-2"
            :label="$t('startBuilding')"
            :items="buildings"
            item-value="code"
            :item-title="item => `${item.code} - ${item.name}`"
            v-model="selectedStartBuilding"
            variant="underlined"
            />
            <v-select
            class="ma-2"
            :label="$t('endBuilding')"
            :items="buildings"
            item-value="code"
            :item-title="item => `${item.code} - ${item.name}`"
            v-model="selectedEndBuilding"
            variant="underlined"
            />
            <v-btn-toggle 
            color="info"
            class="d-flex justify-center"
            v-model="selectedMode"
            variant="outlined"
            >
                <v-btn v-model="selectedMode" value="foot" @click="selectedMode = 'foot'">
                    <v-icon>mdi-walk</v-icon>   
                </v-btn>
            
                <v-btn v-model="selectedMode" value="bike" @click="selectedMode = 'bike'"> 
                    <v-icon>mdi-bike</v-icon>
                </v-btn>
            
                <v-btn v-model="selectedMode" value="car" @click="selectedMode = 'car'">
                    <v-icon>mdi-car</v-icon>
                </v-btn>
            </v-btn-toggle>
            <v-btn 
            color="info" 
            @click="findRoute"
            class="mt-5 "
            >{{ $t('findRoute') }}</v-btn>
        </v-card-text>
    </v-card>   
</template>

<style scoped lang="scss">

</style>