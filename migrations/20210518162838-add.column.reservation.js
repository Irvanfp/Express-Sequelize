"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Reservations", "token", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Reservations", "url_confirmation", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Reservations", "token");
    await queryInterface.removeColumn("Reservations", "url_confirmation");
  },
};
