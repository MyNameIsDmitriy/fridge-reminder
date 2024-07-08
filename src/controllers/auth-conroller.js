import axios from "axios";

export default class AuthApi {
  constructor() {
    this.err;
  }

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

  async login(email, password) {
    try {
      const response = await axios.post("http://localhost:8888/auth/login", {
        email,
        password,
      });

      return response;
    } catch (e) {
      this.err = e;
      console.error(e.response);
    }
  }
}
