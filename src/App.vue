<script setup>
import Navigation from './components/Navigation.vue';

</script>

<template>
  <div class="flex flex-col min-h-screen font-family-main bg-weather-primary">
    <Navigation />
    <RouterView />
  </div>
</template>

<style scoped>
</style>