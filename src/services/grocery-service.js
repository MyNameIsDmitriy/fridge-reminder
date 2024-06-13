const { Groceries } = require("../../models");

class GroceryService {
  async getAllGroceries() {
    return Groceries.findAll();
  }

  async getGrocery(id) {
    return Groceries.findByPk(id);
  }

  async createGrocery(name, url, isCustom) {
    const newGrocery = await Groceries.create({
      groceryName: name,
      imgUrl: url,
      isCustom: isCustom,
    });

    return newGrocery;
  }

  async updateGrocery(id, name, url) {
    const grocery = await Groceries.findByPk(id);
    if (!grocery) {
      throw new Error("Grocery not found");
    }
    grocery.groceryName = name;
    grocery.imgUrl = url;

    return grocery.save();
  }

  async deleteGrocery(id) {
    const grocery = await Groceries.findByPk(id);
    if (!grocery) {
      throw new Error("Grocery not found");
    }
    await grocery.destroy();
    return grocery;
  }
}

module.exports = GroceryService;
