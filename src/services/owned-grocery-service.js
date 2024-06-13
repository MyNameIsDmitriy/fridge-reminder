const { OwnedGroceries } = require("../../models");

class OwnedGroceryService {
  async getAllOwnedGroceries() {
    return OwnedGroceries.findAll();
  }

  async getOwnedGrocery(id) {
    return OwnedGroceries.findByPk(id);
  }

  async createOwnedGrocery(userId, groceryId, amount) {
    const newOwnedGrocery = await OwnedGroceries.create({
      userId: userId,
      groceryId: groceryId,
      amount: amount,
    });

    return newOwnedGrocery;
  }

  async updateOwnedGrocery(ownedGroceryId, groceryId, amount) {
    const ownedGrocery = await OwnedGroceries.findByPk(ownedGroceryId);
    if (!ownedGrocery) {
      throw new Error("Your grocery not found");
    }
    ownedGrocery.groceryId = groceryId;
    ownedGrocery.amount = amount;

    return ownedGrocery.save();
  }

  async deleteOwnedGrocery(id) {
    const deletedOwnedGrocery = await OwnedGroceries.findByPk(id);
    if (!deletedOwnedGrocery) {
      throw new Error("Your grocery not found");
    }

    await deletedOwnedGrocery.destroy();
    return deletedOwnedGrocery;
  }
}

module.exports = OwnedGroceryService;
