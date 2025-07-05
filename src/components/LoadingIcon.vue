<script lang="ts">
export default {
    name: 'LoadingIcon',
}
</script>

<template>
    <v-progress-circular indeterminate color="primary" class="loading-icon" />
</template>

<style scoped lang="scss">
    .loading-icon {
        position: absolute;
        bottom: 5%;
        left: 50%;
        transform: translate(-50%, -50%);
        visibility: hidden;
        pointer-events: none;
    }
</style>