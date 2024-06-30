import axios from "axios";

export default class groceryAPI {
  async getAllGroceries() {
    return axios.get("http://localhost:8888/groceries/").then((response) => {
      return response.data;
    });
  }

  async getGrocery(id) {
    return axios
      .get(`http://localhost:8888/groceries/${id}`)
      .then((response) => {
        return response.data;
      });
  }
}
