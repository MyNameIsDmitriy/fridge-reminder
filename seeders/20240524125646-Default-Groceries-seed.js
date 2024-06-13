"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Groceries", [
      {
        groceryName: "banana",
        imgUrl: "/banana.svg",
        isCustom: false,
      },
      {
        groceryName: "cucumber",
        imgUrl: "/cucumber.svg",
        isCustom: false,
      },
      {
        groceryName: "potato",
        imgUrl: "/potato.svg",
        isCustom: false,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Groceries", {
      groceryName: {
        [Sequelize.Op.in]: ["banana", "cucumber", "potato"],
      },
    });
  },
};
