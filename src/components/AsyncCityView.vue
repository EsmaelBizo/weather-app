<template>
  <div class="flex flex-col flex-1 items-center text-white pt-8">
    <div
      v-if="weatherData"
      class="flex flex-col items-center select-none animate-fade-in w-full max-w-sm mx-auto pb-8 px-4"
    >
      <div class="flex items-center gap-4 mb-2">
        <h1
          class="text-4xl font-extrabold tracking-tight text-white drop-shadow-md"
        >
          {{ weatherData.location.name }}
        </h1>

        <button
          @click="toggleFavorite"
          class="cursor-pointer transition-all duration-200 active:scale-90 hover:opacity-80"
        >
          <i
            :class="
              isAlreadySaved
                ? 'fa-solid fa-star text-amber-400'
                : 'fa-regular fa-star text-white/40'
            "
            class="text-2xl drop-shadow-md"
          ></i>
        </button>
      </div>
      <p
        class="text-xs font-semibold text-white/50 mb-8 uppercase tracking-widest"
      >
        {{ getTime() }}
      </p>

      <div
        class="relative w-full flex flex-col items-center bg-gradient-to-b from-white/12 to-white/4 border border-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl overflow-hidden group transition-all duration-500 hover:shadow-white/5"
      >
        <div
          class="absolute -top-16 -left-16 w-44 h-44 bg-amber-400/10 rounded-full blur-3xl transition-all duration-700 group-hover:bg-amber-400/20"
        ></div>

        <div
          class="mb-3 transform transition-transform duration-500 group-hover:scale-105"
        >
          <component
            :is="getWeatherIcon(weatherData.current.condition.code)"
            class="w-32 h-32 drop-shadow-[0_10px_20px_rgba(255,255,255,0.12)] animate-bounce-slow"
            :class="getIconColor(weatherData.current.condition.code)"
          />
        </div>

        <p class="text-lg font-bold text-white/90 tracking-wide mb-3">
          {{ weatherData.current.condition.text }}
        </p>

        <div class="flex items-start text-white mb-6 pl-4">
          <span class="text-8xl font-black tracking-tighter leading-none">
            {{ Math.round(weatherData.current.temp_c) }}
          </span>
          <span class="text-3xl font-light mt-1 ml-1 text-white/70">°C</span>
        </div>

        <div
          class="w-full grid grid-cols-3 gap-2 pt-6 mt-2 border-t border-white/10 text-center text-white/70 text-xs"
        >
          <div class="flex flex-col gap-1 border-r border-white/5">
            <span class="text-white/40 font-medium">Feels Like</span>
            <span class="font-bold text-white text-sm">
              {{ Math.round(weatherData.current.feelslike_c) }}°
            </span>
          </div>

          <div class="flex flex-col gap-1 border-r border-white/5">
            <span class="text-white/40 font-medium">Humidity</span>
            <span class="font-bold text-white text-sm">
              {{ weatherData.current.humidity }}%
            </span>
          </div>

          <div class="flex flex-col gap-1">
            <span class="text-white/40 font-medium">Wind</span>
            <span class="font-bold text-white text-sm">
              {{ Math.round(weatherData.current.wind_kph) }}
              <span class="text-[10px] text-white/40 font-normal">km/h</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <hr class="w-full border-t my-8" />

    <div class="relative w-full max-w-xs mb-12">
      <button
        @click="isOpen = !isOpen"
        type="button"
        class="w-full bg-weather-secondary text-white py-3 px-5 rounded-xl flex items-center justify-between cursor-pointer border border-white/10 hover:bg-white/5 transition-all duration-300 focus:outline-none shadow-md"
      >
        <span class="text-xl font-medium tracking-wide">
          {{ forecast === "hourly" ? "Hourly Forecast" : "7-Day Forecast" }}
        </span>
        <ChevronDown
          class="w-6 h-6 text-slate-300 transition-transform duration-300"
          :class="{ 'rotate-180 text-white': isOpen }"
        />
      </button>

      <div
        v-if="isOpen"
        class="absolute top-[calc(100%+8px)] left-0 w-full bg-weather-secondary/95 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl border border-white/10 z-50 transition-all"
      >
        <div
          @click="selectOption('hourly')"
          class="py-4 px-5 text-white hover:bg-weather-primary/60 cursor-pointer transition-colors text-lg flex items-center justify-between"
          :class="{ 'bg-weather-primary font-bold': forecast === 'weekly' }"
        >
          <span>Hourly Forecast</span>
          <span
            v-if="forecast === 'hourly'"
            class="w-2 h-2 bg-white rounded-full"
          ></span>
        </div>

        <div
          @click="selectOption('weekly')"
          class="py-4 px-5 text-white hover:bg-weather-primary/60 cursor-pointer transition-colors text-lg flex items-center justify-between border-t border-white/5"
          :class="{ 'bg-weather-primary font-bold': forecast === 'hourly' }"
        >
          <span>7-Day Forecast</span>
          <span
            v-if="forecast === 'weekly'"
            class="w-2 h-2 bg-white rounded-full"
          ></span>
        </div>
      </div>
    </div>

    <div
      v-show="forecast === 'hourly'"
      class="w-full max-w-4xl mx-auto px-4 mb-12"
    >
      <div class="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-thin">
        <div
          v-for="(hour, index) in weatherData.forecast.forecastday[0].hour"
          :key="hour.time"
          class="flex flex-col items-center justify-between min-w-[95px] bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 snap-center hover:bg-white/10 transition-all duration-300 shadow-lg group"
        >
          <span
            class="text-xs font-medium text-white/60 group-hover:text-white/90 transition-colors"
          >
            {{ formatHour(hour.time) }}
          </span>

          <component
            :is="getWeatherIcon(hour.condition.code)"
            class="w-10 h-10 my-3 drop-shadow-[0_4px_8px_rgba(255,255,255,0.15)] transition-transform duration-500 group-hover:scale-110"
            :class="getIconColor(hour.condition.code)"
          />

          <span class="font-bold text-lg text-white">
            {{ Math.round(hour.temp_c) }}°
          </span>
        </div>
      </div>
    </div>

    <div
      v-show="forecast === 'weekly'"
      class="w-full max-w-4xl mx-auto px-4 mb-12"
    >
      <div
        class="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-5 shadow-xl flex flex-col gap-1"
      >
        <div
          v-for="(day, index) in weatherData.forecast.forecastday"
          :key="day.date"
          class="flex items-center justify-between py-3.5 px-4 border-b border-white/5 last:border-none hover:bg-white/5 rounded-xl transition-all duration-200 group"
        >
          <p class="w-24 font-semibold text-white text-base text-left">
            {{ formatDay(day.date) }}
          </p>

          <div class="flex items-center gap-3 flex-1 justify-start md:pl-16">
            <component
              :is="getWeatherIcon(day.day.condition.code)"
              class="w-7 h-7 transition-transform group-hover:rotate-12 duration-300"
              :class="getIconColor(day.day.condition.code)"
            />
            <span
              class="text-sm text-white/60 font-medium hidden sm:inline-block"
            >
              {{ day.day.condition.text }}
            </span>
          </div>

          <div class="flex items-center gap-4 justify-end font-bold text-base">
            <span class="text-white/40 text-sm font-medium w-8 text-right"
              >{{ Math.round(day.day.mintemp_c) }}°</span
            >

            <div
              class="w-16 md:w-24 bg-white/10 h-1.5 rounded-full overflow-hidden relative hidden xs:block"
            >
              <div
                class="absolute left-1/4 right-1/4 bg-gradient-to-r from-sky-400 to-amber-400 h-full rounded-full"
              ></div>
            </div>

            <span class="text-white w-8 text-right"
              >{{ Math.round(day.day.maxtemp_c) }}°</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudFog,
  CloudSnow,
  HelpCircle,
} from "lucide-vue-next";
import { ChevronDown } from "lucide-vue-next";
import { useCitiesStore } from "@/stores/cities";
import { computed, ref } from "vue";

const forecast = ref("hourly");
const isOpen = ref(false);

const selectOption = (value) => {
  forecast.value = value;
  isOpen.value = false;
};

const route = useRoute();
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const getWeatherData = async () => {
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${route.params.cityURL}&days=7`,
    );

    return response.data;
  } catch (err) {
    console.error("خطأ في جلب بيانات الطقس:", err);
  }
};

const weatherData = await getWeatherData();

const getTime = () => {
  if (weatherData.location.localtime) {
    const localTime = new Date(weatherData.location.localtime);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return localTime.toLocaleDateString("en-US", options);
  }
};

const formatHour = (timeStr) => {
  return new Date(timeStr).toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });
};

const formatDay = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short",
  });
};

const getWeatherIcon = (code) => {
  if (code === 1000) return Sun; // مشمس
  if ([1003, 1006, 1009].includes(code)) return Cloud; // غائم
  if (
    [1063, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(code)
  )
    return CloudRain; // مطر
  if ([1087, 1273, 1276, 1279, 1282].includes(code)) return CloudLightning; // عاصفة رعدية
  if ([1030, 1135, 1147].includes(code)) return CloudFog; // ضباب
  if ([1066, 1210, 1225, 1255, 1258].includes(code)) return CloudSnow; // ثلج

  return HelpCircle; // أيقونة احتياطية في حال وجود كود غير معروف
};

const getIconColor = (code) => {
  if (code === 1000) return "text-yellow-400"; // شمس صفراء
  if ([1003, 1006, 1009].includes(code)) return "text-slate-300"; // غيوم رمادية ناعمة
  if (
    [1063, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(code)
  )
    return "text-sky-400"; // مطر أزرق سماوي
  if ([1087, 1273, 1276, 1279, 1282].includes(code)) return "text-amber-300"; // برق
  return "text-white";
};

const citiesStore = useCitiesStore();

const isAlreadySaved = computed(() => {
  return citiesStore.savedCities.some((city) => city.cityURL === route.params.cityURL);
});

const toggleFavorite = () => {
  if (isAlreadySaved.value) {
    citiesStore.removeCity(route.params.cityURL);
  } else {
    citiesStore.addCity({
      id: Date.now(),
      cityName: weatherData.location.name,
      cityRegion: weatherData.location.region,
      cityCountry: weatherData.location.country,
      cityURL: route.params.cityURL,
    });
  }
};
</script>

<style scoped>
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05);
}

.scrollbar-thin::-webkit-scrollbar {
  height: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}

.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-bounce-slow {
  animation: bounceSlow 3.5s infinite ease-in-out;
}

@keyframes bounceSlow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}
</style>
