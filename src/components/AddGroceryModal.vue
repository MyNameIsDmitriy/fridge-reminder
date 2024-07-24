<script setup>
import { ref, onMounted } from "vue";

import { useGroceryStore } from "../stores/GroceryStore";
import { useGroceryTypeStore } from "../stores/GroceryTypeStore";
import { useOwnedGroceryStore } from "../stores/OwnedGroceryStore";

const emit = defineEmits(["toggleAddGroceryModal"]);

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
});

const input = ref(null);
const user = ref({});

const groceryStore = useGroceryStore();
const groceryTypeStore = useGroceryTypeStore();
const ownedGroceryStore = useOwnedGroceryStore();

const toggleAddGroceryModal = () => {
  emit("toggleAddGroceryModal");
};

const findGroceryByType = (id) => {
  const filterTypeId = groceryStore.groceries.filter((grocery) => {
    return grocery.groceryTypeId === id;
  });

  if (filterTypeId[0]) {
    return true;
  } else return false;
};

// TODO: optimize ? too many dunction calls ?
const getImageUrl = (name) => {
  return new URL(`../assets/svg/groceries-icon/${name}.svg`, import.meta.url)
    .href;
};

const createOwnedGrocery = (groceryId) => {
  ownedGroceryStore.createOwnedGrocery(user.value.userId, groceryId, 1);
  toggleAddGroceryModal();
};

onMounted(() => {
  user.value = JSON.parse(localStorage.getItem("user"));

  groceryStore.fetchAllGroceries();
  groceryTypeStore.fetchAllGroceriesTypes();
  ownedGroceryStore.fetchAllUserOwnedGroceries(user.value.userId);
});
</script>

<template>
  <Transition name="fade">
    <div
      class="absolute w-full h-screen top-0 left-0 flex justify-center bg-gray-700 bg-opacity-50 px-4"
      v-show="isVisible"
      @click.self="toggleAddGroceryModal"
    >
      <Transition name="fade-inner">
        <div
          class="w-4/6 h-4/6 m-4 self-center rounded-md bg-nearlyblack"
          v-if="isVisible"
        >
          <!-- TODO: sticky to the top input -->
          <div class="relative w-full flex">
            <input
              class="w-full text-lg rounded-t-md border-b border-purple-600 outline-none bg-transparent px-11 py-2 placeholder:text-gray-500"
              ref="input"
              placeholder="Search..."
              autocomplete="off"
              type="text"
            />
            <img
              class="absolute w-6 top-2.5 left-3 pointer-events-none"
              src="../assets/svg/header/search-icon.svg"
              alt="search icon"
            />
            <button
              @click="toggleAddGroceryModal"
              class="absolute top-2 right-3 w-7 h-7 flex justify-center items-center rounded-md hover:bg-purple-500 hover:bg-opacity-40"
              type="button"
            >
              <img
                class="w-5"
                src="../assets/svg/header/cross.svg"
                alt="cross icon"
              />
            </button>
          </div>
          <div class="m-2 px-3 flex flex-col">
            <div
              v-for="type in groceryTypeStore.groceriesTypes"
              :key="type.groceryTypeId"
              class="mb-6"
              :class="{ hidden: !findGroceryByType(type.groceryTypeId) }"
            >
              <h3 class="border-b border-purple-600 text-lg uppercase">
                {{ type.groceryTypeName }}
              </h3>

              <div class="flex flex-wrap">
                <div
                  @click="createOwnedGrocery(grocery.groceryId)"
                  v-for="grocery in groceryStore.groceries"
                  :key="grocery.groceryId"
                  class="flex items-center gap-2 mr-3 my-2 px-2 py-0.5 rounded bg-purple-600 bg-opacity-30 cursor-pointer"
                  :class="{
                    hidden: grocery.groceryTypeId !== type.groceryTypeId,
                  }"
                >
                  <img
                    class="w-4 max-h-4"
                    :src="getImageUrl(grocery.groceryName)"
                    alt="grocery icon"
                  />
                  <p>{{ grocery.groceryName }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.19, 1, 0.22, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1) 0.15s;
}

.fade-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.fade-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.fade-inner-leave-to {
  transform: scale(0.8);
}
</style>
