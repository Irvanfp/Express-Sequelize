"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Reservations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      guest_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      guest_number: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      guest_email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      start_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      end_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      total: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      price_per_night: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      number_of_nights: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_room: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_user: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM({
          values: ["approved", "not approved", "failed", "done"],
        }),
        defaultValue: "not approved",
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      expire_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint("Reservations", {
      fields: ["id_user"],
      type: "foreign key",
      name: "custom_fkey_id_user_for_reservation",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("Reservations", {
      fields: ["id_room"],
      type: "foreign key",
      name: "custom_fkey_id_room",
      references: {
        table: "Rooms",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Reservations");
  },
};
