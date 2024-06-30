import axios from "axios";

export default class groceryTypeAPI {
  async getAllGroceriesTypes() {
    return axios
      .get("http://localhost:8888/groceries-types/")
      .then((response) => {
        return response.data;
      });
  }
}
