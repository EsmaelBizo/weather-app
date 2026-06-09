<template>
  <teleport to="body">
    <transition name="outer-fade">
      <div
        v-show="showModel"
        class="fixed left-0 top-0 w-full h-screen flex items-center justify-center bg-black/30"
        @click.self="$emit('close-modal')"
      >
        <transition name="inner-fade">
          <div
            v-if="showModel"
            class="p-4 bg-white shadow-lg self-start mt-32 max-w-3xl relative rounded-lg w-full mx-4"
          >
            <button
              class="cursor-pointer font-semibold text-slate-500 absolute top-2 right-2 hover:text-slate-700 transition-colors duration-300"
              @click="$emit('close-modal')"
            >
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
            <slot />
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { Transition } from "vue";

defineEmits(["close-modal"]);
defineProps({
  showModel: {
    type: Boolean,
    default: false,
  },
});
</script>

<style>
.outer-fade-enter-from,
.outer-fade-leave-to {
  opacity: 0;
}

.outer-fade-enter-active,
.outer-fade-leave-active {
  transition: opacity 0.3s;
}

.inner-fade-enter-from,
.inner-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.inner-fade-enter-active {
  transition: all 0.3s 0.15s;
}

.inner-fade-leave-active {
  transition: all 0.3s;
}
</style>
