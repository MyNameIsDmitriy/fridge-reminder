"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Groceries extends Model {
    static associate(models) {
      // define association here
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
    },
    {
      sequelize,
      modelName: "Groceries",
      timestamps: false,
    }
  );
  return Groceries;
};
