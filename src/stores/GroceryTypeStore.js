import { defineStore } from "pinia";
import groceryTypeAPI from "../controllers/grocery-type-controller";

const groceryTypeApi = new groceryTypeAPI();

export const useGroceryTypeStore = defineStore("groceryTypeStore", {
  state: () => ({
    groceriesTypes: [],
  }),

  actions: {
    async fetchAllGroceriesTypes() {
      try {
        const data = await groceryTypeApi.getAllGroceriesTypes();
        this.groceriesTypes = data;
      } catch (e) {
        console.error("Get an error when fetching groceries types: " + e);
      }
    },
  },
});
