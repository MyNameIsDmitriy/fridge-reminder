import axios from "axios";

export default class AuthApi {
  async register(email, password) {
    try {
      const response = await axios.post("http://localhost:8888/auth/register", {
        email,
        password,
      });

      console.log(response);
      console.log(response.status);
      return response;
    } catch (error) {
      console.error(error.response);
    }
  }

  async post() {}
}
