<template>
  <div
    @click="goToCityDetails"
    class="relative flex items-center justify-between p-5 bg-gradient-to-r from-white/8 to-white/4 border border-white/10 backdrop-blur-xl rounded-3xl text-white shadow-lg hover:shadow-white/5 hover:bg-white/12 hover:scale-[1.01] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer select-none group overflow-hidden mb-4"
  >
    <div
      class="absolute -right-10 -bottom-10 w-32 h-32 bg-sky-400/5 rounded-full blur-2xl transition-all duration-500 group-hover:bg-sky-400/15"
    ></div>

    <div class="flex flex-col flex-1 min-w-0 pr-4">
      <h2 class="text-2xl font-extrabold tracking-tight truncate drop-shadow-sm group-hover:text-amber-400 transition-colors">
        {{ city.cityName }}, {{ city.cityRegion }}
      </h2>
      <p class="text-xs font-semibold text-white/50 truncate uppercase tracking-wider mt-1">
        {{ city.cityCountry }}
      </p>
    </div>

    <div class="flex items-center gap-4 z-10" v-if="city.weather">
      <component
        :is="getWeatherIcon(city.weather.current.condition.code)"
        class="w-12 h-12 drop-shadow-[0_4px_10px_rgba(255,255,255,0.1)] transition-transform duration-500 group-hover:scale-110"
        :class="getIconColor(city.weather.current.condition.code)"
      />

      <div class="flex flex-col items-end min-w-[70px]">
        <span class="text-4xl font-black tracking-tighter leading-none mb-1">
          {{ Math.round(city.weather.current.temp_c) }}°
        </span>
        
        <div class="flex gap-2 text-[10px] font-bold text-white/50 tracking-wide">
          <span class="text-white/80">H: {{ Math.round(city.weather.forecast.forecastday[0].day.maxtemp_c) }}°</span>
          <span>L: {{ Math.round(city.weather.forecast.forecastday[0].day.mintemp_c) }}°</span>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-3" v-else>
      <div class="w-8 h-8 bg-white/10 rounded-full animate-pulse"></div>
      <div class="w-12 h-8 bg-white/10 rounded-xl animate-pulse"></div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudFog,
  CloudSnow,
  HelpCircle,
} from "lucide-vue-next";

const props = defineProps({
  city: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const goToCityDetails = () => {
  router.push({
    name: "city",
    params: { cityURL:props.city.cityURL },
    query: {
      cityName: props.city.cityName,
      cityRegion: props.city.cityRegion,
      cityCountry: props.city.cityCountry,
    }
  });
};

const getWeatherIcon = (code) => {
  if (code === 1000) return Sun;
  if ([1003, 1006, 1009].includes(code)) return Cloud;
  if ([1063, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(code)) return CloudRain;
  if ([1087, 1273, 1276, 1279, 1282].includes(code)) return CloudLightning;
  if ([1030, 1135, 1147].includes(code)) return CloudFog;
  if ([1066, 1210, 1225, 1255, 1258].includes(code)) return CloudSnow;
  return HelpCircle;
};

const getIconColor = (code) => {
  if (code === 1000) return "text-yellow-400";
  if ([1003, 1006, 1009].includes(code)) return "text-slate-300";
  if ([1063, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(code)) return "text-sky-400";
  if ([1087, 1273, 1276, 1279, 1282].includes(code)) return "text-amber-300";
  return "text-white";
};
</script>