<script setup>
defineEmits(["toggleAddGroceryModal"]);

defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    class="absolute w-full h-screen top-0 left-0 flex justify-center px-8 bg-opacity-30"
    v-show="isVisible"
    @click.self="$emit('toggleAddGroceryModal')"
  >
    <div
      class="w-[1000px] h-[600px] p-4 self-start mt-10 bg-white bg-opacity-70"
      v-if="isVisible"
    ></div>
  </div>
</template>

<style scoped></style>
