const express = require("express");
const groceryRouter = express.Router();

module.exports = (groceryService) => {
  groceryRouter.get("/", async (req, res) => {
    try {
      const groceries = await groceryService.getAllGroceries();

      res.json(groceries);
    } catch (e) {
      res.status(e.statusCode || 500).json({ message: e.message });
    }
  });

  groceryRouter.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const grocery = await groceryService.getGrocery(Number(id));

      res.json(grocery);
    } catch (e) {
      res.status(e.statusCode || 500).json({ message: e.message });
    }
  });

  groceryRouter.post("/", async (req, res) => {
    try {
      const { groceryName, imgUrl, isCustom } = req.body;
      const newGrocery = await groceryService.createGrocery(
        groceryName,
        imgUrl,
        isCustom
      );

      res.status(201).json(newGrocery);
    } catch (e) {
      res.status(e.statusCode || 500).json({ message: e.message });
    }
  });

  groceryRouter.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { groceryName, imgUrl } = req.body;
      const updatedGrocery = await groceryService.updateGrocery(
        Number(id),
        Number(groceryName),
        imgUrl
      );

      res.json(updatedGrocery);
    } catch (e) {
      res.status(e.statusCode || 500).json({ message: e.message });
    }
  });

  groceryRouter.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedGrocery = await groceryService.deleteGrocery(Number(id));

      res.json(deletedGrocery);
    } catch (e) {
      res.status(e.statusCode || 500).json({ message: e.message });
    }
  });

  return groceryRouter;
};
