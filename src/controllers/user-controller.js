import axios from "axios";

export default class UserAPI {
  async getAllUsers() {
    return axios.get("http://localhost:8888/users/").then((response) => {
      return response.data;
    });
  }
}
