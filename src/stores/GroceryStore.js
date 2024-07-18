import { defineStore } from "pinia";
import groceryAPI from "../controllers/grocery-controller";

const groceryApi = new groceryAPI();

export const useGroceryStore = defineStore("groceryStore", {
  state: () => ({
    groceries: [],
  }),

  actions: {
    async fetchAllGroceries() {
      try {
        const data = await groceryApi.getAllGroceries();
        this.groceries = data;
      } catch (e) {
        console.error("Get an error when fetching groceries: " + e);
      }
    },
  },
});
