<script lang="ts">

export default {
    name: 'ClearRoute',
}

</script>

<template>
    <v-btn id="routeClear" color="info" variant="elevated" class="position-absolute bottom-0 right-0 ma-2">{{ $t('clearRoute') }}</v-btn>
</template>

<style scoped lang="scss">
    #routeClear {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: min-content;
        visibility: hidden;
        pointer-events: none;
    }
</style>