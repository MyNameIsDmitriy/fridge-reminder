const express = require("express");
const authRouter = express.Router();

const validateDto = require("../../middlewares/validateDto");
const userSchema = require("../../schema/user-schema");

module.exports = (userService) => {
  authRouter.post("/register", validateDto(userSchema), async (req, res) => {
    try {
      const { email, password } = req.body;
      const registeredUser = await userService.register(email, password);

      res.json(registeredUser);
    } catch (e) {
      res.status(e.statusCode || 500).json({ message: e.message });
    }
  });

  authRouter.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const [user, token] = await userService.login(email, password);

      res.json({ token: token, user: user });
    } catch (e) {
      res.status(e.statusCode || 500).json({ message: e.message });
    }
  });

  return authRouter;
};
