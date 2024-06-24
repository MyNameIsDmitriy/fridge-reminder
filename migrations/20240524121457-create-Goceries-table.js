"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Groceries", {
      groceryId: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      groceryName: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      imgUrl: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isCustom: {
        type: Sequelize.BOOLEAN,
      },
      groceryTypeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "GroceriesTypes", key: "groceryTypeId" },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Groceries");
  },
};
