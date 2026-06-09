<template>
  <div
    class="relative flex items-center justify-between p-5 bg-gradient-to-r from-white/8 to-white/4 border border-white/10 backdrop-blur-xl rounded-3xl text-white shadow-lg mb-4 overflow-hidden select-none"
  >
    <div
      class="absolute -right-10 -bottom-10 w-32 h-32 bg-sky-400/5 rounded-full blur-2xl"
    ></div>

    <div class="flex flex-col flex-1 min-w-0 pr-4 gap-2">
      <AnimatedPlaceholder class="max-w-[65%] h-7 rounded-xl" />
      <AnimatedPlaceholder class="max-w-[35%] h-3.5 rounded-md" />
    </div>

    <div class="flex items-center gap-4 z-10">
      <AnimatedPlaceholder class="w-12 h-12 rounded-full" />

      <div class="flex flex-col items-end min-w-[70px] gap-1.5">
        <AnimatedPlaceholder class="w-10 h-8 rounded-lg" />
        <AnimatedPlaceholder class="w-16 h-3 rounded-md" />
      </div>
    </div>
  </div>
</template>

<script setup>
import AnimatedPlaceholder from "./AnimatedPlaceholder.vue";
</script>