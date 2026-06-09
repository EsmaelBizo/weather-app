<template>
  <div v-for="city in savedCities" :key="city.url">
    <CityCard :city="city" />
  </div>
</template>

<script setup>
import axios from "axios";
import CityCard from "./CityCard.vue";
import { useCitiesStore } from "@/stores/cities";
import { ref } from "vue";

const citiesStore = useCitiesStore();
const savedCities = ref(citiesStore.savedCities) ;

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
if (savedCities) {
  const requests = [];

  savedCities.value.forEach((city) => {
    requests.push(
      axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city.cityURL}&days=1&aqi=no&alerts=no`,
      ),
    );
  });

  const weatherData = await Promise.all(requests);

  weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.data;
  });
}
</script>
