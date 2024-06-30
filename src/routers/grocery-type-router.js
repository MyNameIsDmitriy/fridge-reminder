const express = require("express");
const groceryTypeRouter = express.Router();

module.exports = (groceryTypeService) => {
  groceryTypeRouter.get("/", async (req, res) => {
    try {
      const groceriesTypes = await groceryTypeService.getAllGroceriesTypes();
      res.json(groceriesTypes);
    } catch (e) {
      res.status(e.statusCode || 500).json({ message: e.message });
    }
  });

  return groceryTypeRouter;
};
