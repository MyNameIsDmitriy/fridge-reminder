"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Groceries extends Model {
    static associate(models) {
      Groceries.belongsTo(models.GroceriesTypes, {
        foreignKey: "groceryTypeId",
      });
      Groceries.belongsToMany(models.OwnedGroceries, {
        through: "OwnedGroceries_Groceries",
        onDelete: "CASCADE",
      });
    }
  }

  Groceries.init(
    {
      groceryId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      groceryName: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      imgUrl: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      isCustom: {
        type: DataTypes.BOOLEAN,
      },
      groceryTypeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "GroceriesTypes", key: "groceryTypeId" },
      },
    },
    {
      sequelize,
      modelName: "Groceries",
      timestamps: false,
    }
  );
  return Groceries;
};
