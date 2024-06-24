"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GroceriesTypes extends Model {
    static associate(models) {
      GroceriesTypes.hasMany(models.Groceries);
    }
  }

  GroceriesTypes.init(
    {
      groceryTypeId: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      groceryTypeName: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "GroceriesTypes",
    }
  );
  return GroceriesTypes;
};
