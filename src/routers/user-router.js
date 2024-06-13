const express = require("express");
const userRouter = express.Router();

const authMiddleware = require("../../middlewares/auth-middleware.js");
const validateDto = require("../../middlewares/validateDto.js");

const userSchema = require("../../schema/user-schema.js");

module.exports = (userService) => {
  userRouter.get("/", async (req, res) => {
    try {
      const users = await userService.getAllUsers();

      res.json(users);
    } catch (e) {
      res.status(e.statusCode || 500).json({ message: e.message });
    }
  });

  userRouter.get("/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userService.getUser(Number(id));

      res.json(user);
    } catch (e) {
      res.status(e.statusCode || 500).json({ message: e.message });
    }
  });

  userRouter.post("/", validateDto(userSchema), async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userService.createUser(email, password);

      res.status(201).json(user);
    } catch (e) {
      res.status(e.statusCode || 500).json({ message: e.message });
    }
  });

  userRouter.put("/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const updatedUser = req.body;
      const user = await userService.updateUser(Number(id), updatedUser);

      res.json(user);
    } catch (e) {
      console.error(e);
      res.status(e.statusCode || 500).json({ message: e.message });
    }
  });

  userRouter.delete("/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await userService.deleteUser(Number(id));

      res.json(deletedUser);
    } catch (e) {
      res.status(e.statusCode || 500).json({ message: e.message });
    }
  });

  return userRouter;
};
