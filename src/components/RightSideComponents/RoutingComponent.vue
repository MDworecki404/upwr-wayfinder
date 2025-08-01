<script lang="ts" setup>
import { inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import universityBuildings from '../../data/universityBuildings.json';
import  routeFinder  from '../../services/RouteFinder/routeFinder';
import {userRouteFinder} from '../../services/RouteFinder/userRouteFinder';

const { t } = useI18n();
const mapType = inject('mapType') as Ref;
const buildings = ref(universityBuildings.buildings);
const selectedStartBuilding = ref();
const selectedEndBuilding = ref();
const selectedMode = ref('foot');
const routeDistance = ref<number | null>(null);

const toggleRoutingComponentVisibility = inject('toggleRoutingComponentVisibility') as () => void;

const findRoute = async () => {
    const distance = await routeFinder(selectedStartBuilding.value, selectedEndBuilding.value, selectedMode.value, mapType.value);
    routeDistance.value = distance;
}

const findUserRoute = async () => {
    const distance = await userRouteFinder(selectedEndBuilding.value, selectedMode.value, mapType.value);
    routeDistance.value = distance;
}

const selectedRouteType = ref(t('toBuilding'));

// Resetuj odległość gdy zmienia się typ trasy
const resetDistance = () => {
    routeDistance.value = null;
};

const formValidate = () => {
    if (selectedRouteType.value === t('toBuilding') && !selectedEndBuilding.value) {
        return false;
    }
    if (selectedRouteType.value === t('fromBuildingToBuilding') && (!selectedStartBuilding.value || !selectedEndBuilding.value)) {
        return false;
    }
    return true;
}

const resetValues = () => {
    resetDistance();
    selectedStartBuilding.value = null;
    selectedEndBuilding.value = null;
    selectedMode.value = 'foot';
    routeDistance.value = null;
}
</script>

<template>
    <v-card :width="300">
        <v-card-title>{{ $t('routing') }} <v-icon class="position-absolute top-0 right-0 ma-2" style="cursor: pointer;" @click="toggleRoutingComponentVisibility">mdi-close</v-icon></v-card-title>
        <v-divider></v-divider>
        <v-select
        class="ma-3" 
        :items="[$t('toBuilding'), $t('fromBuildingToBuilding')]" 
        v-model="selectedRouteType"
        variant="underlined"
        @update:model-value="resetValues"
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
            :error="!selectedEndBuilding"
            :error-messages="!selectedEndBuilding ? $t('selectEndBuilding') : ''"
            @update:model-value="resetDistance"
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
            <v-card-text class="d-flex justify-center align-center">
                <v-btn
                prepend-icon="mdi-map-marker-distance" 
                color="info"
                variant="outlined" 
                @click="findUserRoute"
                :disabled="!formValidate()"
                class="mt-5"
                >{{ $t('findRoute') }}</v-btn>
            </v-card-text>
            <v-card-text v-if="routeDistance !== null" class="text-center">
                <v-chip color="success" class="ma-2">
                    <v-icon start>mdi-map-marker-distance</v-icon>
                    Odległość: {{ routeDistance }} m
                </v-chip>
            </v-card-text>
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
            :error="!selectedStartBuilding"
            :error-messages="!selectedStartBuilding ? $t('selectStartBuilding') : ''"
            @update:model-value="resetDistance"
            />
            <v-select
            class="ma-2"
            :label="$t('endBuilding')"
            :items="buildings"
            item-value="code"
            :item-title="item => `${item.code} - ${item.name}`"
            v-model="selectedEndBuilding"
            :error="!selectedStartBuilding"
            :error-messages="!selectedStartBuilding ? $t('selectStartBuilding') : ''"
            @update:model-value="resetDistance"
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
            <v-card-text class="d-flex justify-center align-center">
                <v-btn 
                color="info"
                variant="outlined" 
                prepend-icon="mdi-map-marker-distance"
                @click="findRoute"
                class="mt-5"
                :disabled="!formValidate()"
                >{{ $t('findRoute') }}</v-btn>
            </v-card-text>          
            <v-card-text v-if="routeDistance !== null" class="text-center">
                <v-chip color="success" class="ma-2">
                    <v-icon start>mdi-map-marker-distance</v-icon>
                    Odległość: {{ routeDistance }} m
                </v-chip>
            </v-card-text>
        </v-card-text>
    </v-card>   
</template>

<style scoped lang="scss">
.v-btn-toggle {
    .v-btn {
        color: #1976D2 !important;
    }
}
</style>