<template>
  <div class="flex flex-col flex-1 items-center text-white pt-8 w-full">
    <div class="flex flex-col items-center w-full max-w-sm mx-auto pb-8 px-4">
      <div class="flex items-center gap-4 mb-3">
        <AnimatedPlaceholder class="w-48 h-10 rounded-2xl" />
        <AnimatedPlaceholder class="w-7 h-7 rounded-full" />
      </div>

      <AnimatedPlaceholder class="w-56 h-4 rounded-md mb-8" />

      <div
        class="relative w-full flex flex-col items-center bg-gradient-to-b from-white/12 to-white/4 border border-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
      >
        <div
          class="absolute -top-16 -left-16 w-44 h-44 bg-amber-400/5 rounded-full blur-3xl"
        ></div>

        <div class="mb-5">
          <AnimatedPlaceholder class="w-32 h-32 rounded-full" />
        </div>

        <AnimatedPlaceholder class="w-28 h-6 rounded-lg mb-5" />

        <div class="flex items-start mb-6 gap-2">
          <AnimatedPlaceholder class="w-24 h-20 rounded-3xl" />
          <AnimatedPlaceholder class="w-10 h-6 rounded-lg mt-1" />
        </div>

        <div
          class="w-full grid grid-cols-3 gap-2 pt-6 mt-2 border-t border-white/10"
        >
          <div class="flex flex-col items-center gap-2 border-r border-white/5">
            <AnimatedPlaceholder class="w-14 h-3 rounded-md" />
            <AnimatedPlaceholder class="w-10 h-5 rounded-md" />
          </div>
          <div class="flex flex-col items-center gap-2 border-r border-white/5">
            <AnimatedPlaceholder class="w-12 h-3 rounded-md" />
            <AnimatedPlaceholder class="w-8 h-5 rounded-md" />
          </div>
          <div class="flex flex-col items-center gap-2">
            <AnimatedPlaceholder class="w-10 h-3 rounded-md" />
            <AnimatedPlaceholder class="w-12 h-5 rounded-md" />
          </div>
        </div>
      </div>
    </div>

    <hr class="w-full border-t border-white/10 my-8" />

    <div class="w-full max-w-xs mb-12 px-4">
      <AnimatedPlaceholder class="w-full h-13 rounded-xl" />
    </div>

    <div class="w-full max-w-4xl mx-auto px-4 mb-12">
      <div class="flex gap-4 overflow-x-hidden pb-4">
        <div
          v-for="i in 5"
          :key="i"
          class="flex flex-col items-center justify-between min-w-[95px] bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 shadow-lg gap-4"
        >
          <AnimatedPlaceholder class="w-12 h-3 rounded-md" />
          <AnimatedPlaceholder class="w-10 h-10 rounded-full" />
          <AnimatedPlaceholder class="w-8 h-5 rounded-md" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AnimatedPlaceholder from "./AnimatedPlaceholder.vue";
</script>
