"use strict";

// TODO: improve
const fields = [
  {
    groceryTypeName: "meat",
  },
  {
    groceryTypeName: "fish & seafood",
  },
  {
    groceryTypeName: "fruits", // or fruit ?
  },
  {
    groceryTypeName: "vegetables",
  },
  {
    groceryTypeName: "dairy",
  },
  {
    groceryTypeName: "snacks",
  },
  {
    groceryTypeName: "condiments & spices",
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("GroceriesTypes", fields, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("GroceriesTypes", {
      groceryName: {
        // TODO: improve with array
        [Sequelize.Op.in]: [
          "meat",
          "fish & seafood",
          "fruits",
          "vegetables",
          "dairy",
          "snacks",
          "condiments & spices",
        ],
      },
    });
  },
};
