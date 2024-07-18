import axios from "axios";

export default class OwnedGroceryAPI {
  async getUserOwnedGroceries(userId) {
    try {
      return axios
        .get(`http://localhost:8888/fridge/${userId}`)
        .then((response) => {
          return response.data;
        });
    } catch (e) {
      throw e;
    }
  }

  async createOwnedGrocery(userId, groceryId, amount) {
    try {
      return axios
        .post(`http://localhost:8888/fridge/`, {
          userId: userId,
          groceryId: groceryId,
          amount: amount,
        })
        .then((response) => {
          return response.data;
        });
    } catch (e) {
      throw e;
    }
  }

  async updateOwnedGrocery(ownedGroceryId, groceryId, amount) {
    try {
      return axios
        .put(`http://localhost:8888/fridge/${ownedGroceryId}`, {
          groceryId: groceryId,
          amount: amount,
        })
        .then((response) => {
          return response.data;
        });
    } catch (e) {
      throw e;
    }
  }
}
