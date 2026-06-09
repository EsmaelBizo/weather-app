<template>
  <main class="container text-white">
    <div class="mb-8 pt-4 relative z-100">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResult"
        class="py-2 px-1 w-full border-b focus:border-weather-secondary focus:outline-none"
        placeholder="Search for a city or a state"
        @keydown.tab.prevent="tabFirstResult()"
        @keydown.enter.prevent="searchFirstResult()"
      />
      <p v-if="searchError" class="text-red-300 mt-2">
        Something went wrong, please try again later...
      </p>
      <p
        v-else-if="searchResult !== null && searchResult.length === 0"
        class="text-gray-400 mt-2"
      >
        No Results Match Your Query, Try Different Term...
      </p>
      <ul
        v-else-if="searchResult"
        class="absolute bg-weather-primary w-full mt-1 rounded-sm shadow-lg border border-white/10 max-h-60 overflow-y-auto z-50"
      >
        <li
          v-for="result in searchResult"
          :key="result.id"
          class="py-2 px-3 hover:bg-weather-secondary cursor-pointer transition-colors duration-200 border-b border-white/10 last:border-0"
          @click="chooseCity(result)"
        >
          {{ result.name }}, {{ result.region }}, {{ result.country }}
        </li>
      </ul>
    </div>

    <Suspense>
      <CityList />
      <template #fallback>
        <CityCardSkeleton v-for="i in 3" :key="i" />
      </template>
    </Suspense>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import CityList from "@/components/CityList.vue";
import CityCardSkeleton from "@/components/CityCardSkeleton.vue";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const searchQuery = ref("");
let queryTimeout = ref(null);
let searchResult = ref(null);
let searchError = false;

const getSearchResult = () => {
  searchError = false;
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        searchResult.value = await axios.get(
          `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${searchQuery.value}`,
        );
        searchResult.value = searchResult.value.data;
      } catch (error) {
        searchError = true;
      }
      return;
    }
    searchResult.value = null;
  }, 300);
};

const router = useRouter();
const chooseCity = (city) => {
  searchQuery.value = `${city.name}, ${city.region}, ${city.country}`;
  searchResult.value = null;
  router.push({
    name: "city",
    params: { cityURL: city.url },
    query: {
      cityName: city.name,
      cityRegion: city.region,
      cityCountry: city.country,
    },
  });
};

const searchFirstResult = () => {
  if (searchResult.value && searchResult.value.length > 0) {
    chooseCity(searchResult.value[0]);
  }
};

const tabFirstResult = () => {
  if (searchResult.value && searchResult.value.length > 0) {
    searchQuery.value = `${searchResult.value[0].name}, ${searchResult.value[0].region}, ${searchResult.value[0].country}`;
  }
};
</script>
