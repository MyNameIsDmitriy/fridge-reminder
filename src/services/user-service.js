const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { Users } = require("../../models");

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.statusCode = status;
  }
}

class NotFoundError extends ApiError {
  constructor(message) {
    super(404, message);
  }
}

class BadRequestError extends ApiError {
  constructor(message) {
    super(400, message);
  }
}

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
      throw new NotFoundError("User not found");
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
      throw new NotFoundError("User not found");
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
      throw new NotFoundError("User not found");
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
      throw new BadRequestError("Email already in use");
    }
  }

  async register(email, password) {
    await this.checkUserByEmail(email);

    const hashedPassword = bcrypt.hashSync(
      password,
      Number(process.env.HASH_SALT)
    );
    const user = await this.createUser(email, hashedPassword);

    return user;
  }

  async login(email, password) {
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new NotFoundError(`User not found`);
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      throw new BadRequestError("Incorrect password");
    }
    const token = generateAccessToken(user.userId);

    return [user, token];
  }
}

module.exports = UserService;
