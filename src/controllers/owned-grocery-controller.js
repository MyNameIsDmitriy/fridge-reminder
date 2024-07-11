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
}
