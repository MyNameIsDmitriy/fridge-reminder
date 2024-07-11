"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Groceries", [
      {
        groceryName: "banana",
        imgUrl: "/banana.svg",
        groceryTypeId: 3,
        isCustom: false,
      },
      {
        groceryName: "cucumber",
        imgUrl: "/cucumber.svg",
        groceryTypeId: 4,
        isCustom: false,
      },
      {
        groceryName: "potato",
        imgUrl: "/potato.svg",
        groceryTypeId: 4,
        isCustom: false,
      },
      {
        groceryName: "chicken legs",
        imgUrl: "/chicken_legs.svg",
        groceryTypeId: 1,
        isCustom: false,
      },
      {
        groceryName: "chicken wings",
        imgUrl: "/chicken_wings.svg",
        groceryTypeId: 1,
        isCustom: false,
      },
      {
        groceryName: "milk",
        imgUrl: "/milk.svg",
        groceryTypeId: 5,
        isCustom: false,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Groceries", {
      groceryName: {
        [Sequelize.Op.in]: [
          "banana",
          "cucumber",
          "potato",
          "chicken legs",
          "chicken wings",
          "milk",
        ],
      },
    });
  },
};
