const { GroceriesTypes } = require("../../models");

class GroceryTypeService {
  async getAllGroceriesTypes() {
    return GroceriesTypes.findAll();
  }
}

module.exports = GroceryTypeService;
