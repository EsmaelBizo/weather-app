<template>
  <div>
    <Suspense>
      <AsyncCityView />
      <template #fallback>
        <AsyncCityViewSkeleton />
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncCityView from "../components/AsyncCityView.vue";
import AsyncCityViewSkeleton from "../components/AsyncCityViewSkeleton.vue";
</script>