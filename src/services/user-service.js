const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { Users } = require("../../models");

const generateAccessToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
};

class UserService {
  async getAllUsers() {
    return Users.findAll();
  }

  async getUser(id) {
    const user = await Users.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async createUser(email, password) {
    const newUser = await Users.create({
      email: email,
      password: password,
    });

    return newUser;
  }

  async updateUser(id, updatedUser) {
    const user = await Users.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }

    if (updatedUser.password) {
      const hashedPassword = bcrypt.hashSync(
        updatedUser.password,
        Number(process.env.HASH_SALT)
      );
      updatedUser.password = hashedPassword;
    }
    Object.assign(user, updatedUser);

    return user.save();
  }

  async deleteUser(id) {
    const user = await Users.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.destroy();

    return user;
  }

  async checkUserByEmail(email) {
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      // throw new Error("Email already in use");
      return false;
    }

    if (!user) {
      // throw new Error("Email is free");
      return true;
    }
  }

  async register(email, password) {
    const isEmailFree = await this.checkUserByEmail(email);

    if (isEmailFree) {
      const hashedPassword = bcrypt.hashSync(
        password,
        Number(process.env.HASH_SALT)
      );
      const user = await this.createUser(email, hashedPassword);

      return user;
    }

    return isEmailFree;
  }

  async login(email, password) {
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new Error(`User not found`);
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      throw new Error("Incorrect password");
    }
    const token = generateAccessToken(user.userId);

    return [user, token];
  }
}

module.exports = UserService;
