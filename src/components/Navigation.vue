<template>
  <header class="sticky top-0 w-full z-50 bg-slate-900/10 backdrop-blur-md border-b border-white/5 transition-all duration-300">
    <nav
      class="container mx-auto flex flex-row items-center justify-between py-4 px-4 sm:px-6 md:px-8 select-none"
    >
      <RouterLink :to="{ name: 'home' }" class="group transition-transform duration-300">
        <div class="flex items-center gap-3">
          <div class="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 shadow-lg shadow-orange-500/20">
            <i class="fa-solid fa-sun text-lg text-white group-hover:rotate-180 transition-transform duration-500"></i>
          </div>
          
          <div class="flex flex-col">
            <span class="text-2xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70 leading-none">
              WTW
            </span>
            <span class="text-[9px] font-bold text-white/40 uppercase tracking-widest mt-0.5 hidden xs:block">
              What The Weather
            </span>
          </div>
        </div>
      </RouterLink>

      <div class="flex items-center gap-3">
        <button
          @click="toggleModel"
          class="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 hover:shadow-xl hover:shadow-white/5 transition-all duration-300 active:scale-95 cursor-pointer focus:outline-none"
          title="About Application"
        >
          <i class="fa-solid fa-circle-info text-lg"></i>
        </button>
      </div>

      <BaseModel :showModel="showModel" @close-modal="toggleModel">
        <div class="text-slate-800 p-2">
          <h1 class="text-2xl font-black text-slate-900 mb-2 border-b border-slate-100 pb-2 flex items-center gap-2">
            <span class="w-2 h-5 bg-amber-400 rounded-sm"></span> About WTW
          </h1>
          <p class="text-sm text-slate-600 leading-relaxed mb-5">
            This is a premium weather app built with Vue 3 and Tailwind CSS. It integrates with the
            <span class="font-semibold text-slate-900">WeatherAPI</span> to fetch real-time atmospheric data for different cities worldwide, presenting a sleek 7-day and hourly forecast.
          </p>

          <h1 class="text-lg font-bold text-slate-900 mb-1">How to Use</h1>
          <p class="text-sm text-slate-600 leading-relaxed mb-5">
            Simply type any city name in the search bar on the home screen. Click on a result to view its dynamic dashboard, where you can bookmark it directly into your local favorites list.
          </p>

          <h1 class="text-lg font-bold text-slate-900 mb-1">Removing Cities</h1>
          <p class="text-sm text-slate-600 leading-relaxed">
            If you wish to unfavorite a city, open its dashboard and tap the gold star indicator again to remove it instantly from your saved list.
          </p>
        </div>
      </BaseModel>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
import BaseModel from "./BaseModel.vue";
import { ref } from "vue";

const showModel = ref(false);
const toggleModel = () => {
  showModel.value = !showModel.value;
};
</script>