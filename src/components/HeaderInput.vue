<script setup>
const prop = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["toggleAddGroceryModal"]);

const toggleModal = () => {
  emit("toggleAddGroceryModal");
};
</script>

<template>
  <div class="relative" @click="toggleModal()">
    <img
      class="absolute w-7 top-1.5 left-1 pointer-events-none"
      src="../assets/svg/header/search-icon.svg"
      alt="search icon"
    />
    <input
      class="w-full h-10 pl-12 border-0 border-animation rounded-md outline-0 bg-transparent cursor-pointer"
      placeholder="add grocery"
      autocomplete="off"
      ref="input"
      type="text"
      name="text"
    />
  </div>
</template>

<style scoped>
.border-animation {
  animation: rotateShadow 2s infinite cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.border-animation:hover {
  animation-play-state: paused;
  /* animation-duration: 4s; */
}

@keyframes rotateShadow {
  0% {
    box-shadow: -2px -2px 0px 0px #bc6ff1, 2px 2px 0px 0px #892cdc;
  }
  25% {
    box-shadow: -2px 2px 0px 0px #bc6ff1, 2px -2px 0px 0px #892cdc;
  }
  50% {
    box-shadow: 2px 2px 0px 0px #bc6ff1, -2px -2px 0px 0px #892cdc;
  }
  75% {
    box-shadow: 2px -2px 0px 0px #bc6ff1, -2px 2px 0px 0px #892cdc;
  }
  100% {
    box-shadow: -2px -2px 0px 0px #bc6ff1, 2px 2px 0px 0px #892cdc;
  }
}
</style>
