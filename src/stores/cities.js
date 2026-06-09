import { ref } from "vue";
import { defineStore } from "pinia";

export const useCitiesStore = defineStore("cities", () => {
  const savedCities = ref(JSON.parse(localStorage.getItem("cities")) || []);

  const addCity = (cityInfo) => {
    const exists = savedCities.value.some((c) => c.cityURL === cityInfo.cityURL);
    if (exists) return;

    savedCities.value.push(cityInfo);
    localStorage.setItem("cities", JSON.stringify(savedCities.value));
  };

  const removeCity = (cityURL) => {
    savedCities.value = savedCities.value.filter((c) => c.cityURL !== cityURL);
    localStorage.setItem("cities", JSON.stringify(savedCities.value));
  };

  return { savedCities, addCity, removeCity };
});