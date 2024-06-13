"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OwnedGroceries extends Model {
    static associate(models) {
      OwnedGroceries.belongsToMany(models.Users, {
        through: "OwnedGroceries_User",
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      OwnedGroceries.belongsToMany(models.Groceries, {
        through: "OwnedGroceries_Grocery",
        foreignKey: "groceryId",
        onDelete: "CASCADE",
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
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "OwnedGroceries",
    }
  );
  return OwnedGroceries;
};
