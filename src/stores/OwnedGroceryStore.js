import { defineStore } from "pinia";
import OwnedGroceryAPI from "../controllers/owned-grocery-controller";

const ownedGroceryApi = new OwnedGroceryAPI();

export const useOwnedGroceryStore = defineStore("ownedGroceryStore", {
  state: () => ({
    ownedGroceries: [],
  }),

  actions: {
    async fetchAllUserOwnedGroceries(userId) {
      try {
        const data = await ownedGroceryApi.getUserOwnedGroceries(userId);
        this.ownedGroceries = data;
      } catch (e) {
        console.error("Get an error when fetching owned groceries: " + e);
      }
    },

    async createOwnedGrocery(userId, groceryId, amount) {
      try {
        const data = await ownedGroceryApi.createOwnedGrocery(
          userId,
          groceryId,
          amount
        );
        this.ownedGroceries.push(data);
      } catch (e) {
        console.error("Get an error when creating an owned grocery: " + e);
      }
    },

    async updateOwnedGrocery(ownedGroceryId, groceryId, amount) {
      try {
        await ownedGroceryApi.updateOwnedGrocery(
          ownedGroceryId,
          groceryId,
          amount
        );
      } catch (e) {
        console.error("Get an error when unpdating an owned grocery: " + e);
      }
    },
  },
});
