const express = require("express");
const ownedGroceryRouter = express.Router();

module.exports = (ownedGroceryService) => {
  ownedGroceryRouter.get("/", async (req, res) => {
    try {
      const ownedGroceries = await ownedGroceryService.getAllOwnedGroceries();

      res.json(ownedGroceries);
    } catch (e) {
      res.status(e.statusCode || 500).json({ message: e.message });
    }
  });

  ownedGroceryRouter.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const ownedGrocery = await ownedGroceryService.getOwnedGrocery(
        Number(id)
      );

      res.json(ownedGrocery);
    } catch (e) {
      res.status(e.statusCode || 500).json({ message: e.message });
    }
  });

  ownedGroceryRouter.post("/", async (req, res) => {
    try {
      const { userId, groceryId, amount } = req.body;
      const newOwnedGrocery = await ownedGroceryService.createOwnedGrocery(
        Number(userId),
        Number(groceryId),
        amount
      );

      res.status(201).json(newOwnedGrocery);
    } catch (e) {
      res.status(e.statusCode || 500).json({ message: e.message });
    }
  });

  ownedGroceryRouter.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { groceryId, amount } = req.body;
      const updatedOwnedGrocery = await ownedGroceryService.updateOwnedGrocery(
        Number(id),
        Number(groceryId),
        amount
      );

      res.json(updatedOwnedGrocery);
    } catch (e) {
      res.status(e.statusCode || 500).json({ message: e.message });
    }
  });

  ownedGroceryRouter.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedOwnedGrocery = await ownedGroceryService.deleteOwnedGrocery(
        Number(id)
      );

      res.json(deletedOwnedGrocery);
    } catch (e) {
      res.status(e.statusCode || 500).json({ message: e.message });
    }
  });

  return ownedGroceryRouter;
};
