"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("OwnedGroceries", {
      ownedGroceryId: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "userId" },
        onDelete: "CASCADE",
      },
      groceryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Groceries", key: "groceryId" },
        onDelete: "CASCADE",
      },
      amount: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("OwnedGroceries");
  },
};
