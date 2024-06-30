<script setup>
import { onMounted, ref } from "vue";
import groceryAPI from "../controllers/grocery-controller";
import groceryTypeAPI from "../controllers/grocery-type-controller";

const emit = defineEmits(["toggleAddGroceryModal"]);

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
});

const groceryApi = new groceryAPI();
const groceryTypeApi = new groceryTypeAPI();
const groceries = ref(null);
const groceriesTypes = ref(null);

const input = ref(null);

const toggleAddGroceryModal = () => {
  emit("toggleAddGroceryModal");
};

const findGroceryByType = (id) => {
  const filterTypeId = groceries.value.filter((grocery) => {
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

onMounted(async () => {
  console.log(await groceryApi.getAllGroceries());
  console.log(await groceryTypeApi.getAllGroceriesTypes());
  groceries.value = await groceryApi.getAllGroceries();
  groceriesTypes.value = await groceryTypeApi.getAllGroceriesTypes(); // TODO: also by id ?
});
</script>

<template>
  <div
    class="absolute w-full h-screen top-0 left-0 flex justify-center bg-gray-700 bg-opacity-50 px-4"
    v-show="isVisible"
    @click.self="toggleAddGroceryModal"
  >
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
          v-for="type in groceriesTypes"
          :key="type.groceryTypeId"
          class="mb-6"
          :class="{ hidden: !findGroceryByType(type.groceryTypeId) }"
        >
          <h3 class="border-b border-purple-600 text-lg uppercase">
            {{ type.groceryTypeName }}
          </h3>

          <div class="flex flex-wrap">
            <div
              v-for="grocery in groceries"
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
  </div>
</template>

<style scoped></style>
