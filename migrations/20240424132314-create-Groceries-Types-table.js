"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("GroceriesTypes", {
      groceryTypeId: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      groceryTypeName: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("GroceriesTypes");
  },
};
