'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.UUID
      },
      name: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      rating: {
        defaultValue:0,
        min: 0,
        max: 5,
        type: Sequelize.INTEGER
      },
      total_occupancy: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      total_bedrooms: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      total_bathroom: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      summary: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      has_air_con: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      has_internet: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.JSON
      },
      cancelation_policy: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      foodandbeverage: {
        allowNull:false,
        type: Sequelize.JSON
      },
      service: {
        allowNull:false,
        type: Sequelize.JSON
      },
      parkandtransport: {
        allowNull:false,
        type: Sequelize.JSON
      },
      healthy: {
        allowNull:false,
        type: Sequelize.JSON
      },
      accessibility : {
        type: Sequelize.BOOLEAN
      },
      pets_allowed : {
        type: Sequelize.BOOLEAN
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint("Rooms", {
      fields: ["user_id"],
      type: "foreign key",
      name: "custom_fkey_id_user",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Rooms');
  }
};