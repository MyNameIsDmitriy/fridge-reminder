"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OwnedGroceries extends Model {
    static associate(models) {
      OwnedGroceries.belongsTo(models.Users, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      OwnedGroceries.belongsTo(models.Groceries, {
        through: "OwnedGroceries_Groceries",
        foreignKey: "groceryId",
        // onDelete: "CASCADE",
      });
    }
  }

  OwnedGroceries.init(
    {
      ownedGroceryId: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Users", key: "userId" },
        onDelete: "CASCADE",
      },
      groceryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Groceries", key: "groceryId" },
        onDelete: "CASCADE",
      },
      amount: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "OwnedGroceries",
    }
  );
  return OwnedGroceries;
};
