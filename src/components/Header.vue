<script setup>
import { ref } from "vue";

import HeaderInput from "./HeaderInput.vue";
import AddGroceryModal from "./AddGroceryModal.vue";

const isVisible = ref(null);

const toggleAddGroceryModal = () => {
  isVisible.value = !isVisible.value;
};
</script>

<template>
  <header class="my-3 px-3">
    <nav class="flex justify-between items-center">
      <img
        class="w-20"
        src="../assets/svg/header/fridge.svg"
        alt="fridge icon"
      />

      <HeaderInput
        class="w-1/3"
        :isVisible="isVisible"
        @toggleAddGroceryModal="toggleAddGroceryModal"
      />

      <div class="flex items-center gap-2">
        <input class="theme-checkbox" type="checkbox" />
        <img class="w-10" src="../assets/svg/header/user.svg" alt="user icon" />
      </div>

      <AddGroceryModal
        :isVisible="isVisible"
        @toggleAddGroceryModal="toggleAddGroceryModal"
      />
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.theme-checkbox {
  --toggle-size: 8px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 6.25em;
  height: 3.125em;
  background: -webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(50%, #2a2a2a),
      color-stop(50%, #892cdc)
    )
    no-repeat;
  background: -o-linear-gradient(left, #892cdc 50%, #2a2a2a 50%) no-repeat;
  background: linear-gradient(to right, #892cdc 50%, #2a2a2a 50%) no-repeat;
  background-size: 205%;
  background-position: 0;
  -webkit-transition: 0.4s;
  -o-transition: 0.4s;
  transition: 0.4s;
  border-radius: 99em;
  position: relative;
  cursor: pointer;
  font-size: var(--toggle-size);
}

.theme-checkbox::before {
  content: "";
  width: 2.25em;
  height: 2.25em;
  position: absolute;
  top: 0.438em;
  left: 0.438em;
  background: -webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(50%, #efefef),
      color-stop(50%, #2a2a2a)
    )
    no-repeat;
  background: -o-linear-gradient(left, #efefef 50%, #2a2a2a 50%) no-repeat;
  background: linear-gradient(to right, #efefef 50%, #2a2a2a 50%) no-repeat;
  background-size: 205%;
  background-position: 100%;
  border-radius: 50%;
  -webkit-transition: 0.4s;
  -o-transition: 0.4s;
  transition: 0.4s;
}

.theme-checkbox:checked::before {
  left: calc(100% - 2.25em - 0.438em);
  background-position: 0;
}

.theme-checkbox:checked {
  background-position: 100%;
}
</style>
