"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reservation.init(
    {
      guest_name: DataTypes.STRING,
      guest_email: DataTypes.STRING,
      guest_number: DataTypes.INTEGER,
      guest_phone: DataTypes.STRING,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      total: DataTypes.DECIMAL,
      price_per_night: DataTypes.DECIMAL,
      number_of_nights: DataTypes.INTEGER,
      id_room: DataTypes.INTEGER,
      id_user: DataTypes.UUID,
      status: DataTypes.STRING,
      token: DataTypes.STRING,
      url_confirmation: DataTypes.STRING,
      order_id: DataTypes.STRING,
      image: {
        type: DataTypes.STRING,
        get(image) {
          // const image = this.getDataValue("image");
          // if (!image) {
          //   return image;
          // }
          return "/images/" + image;
        },
      },
      expire_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Reservation",
      paranoid: true,
      timestamps: true,
      // freezeTableName: true,
    }
  );
  return Reservation;
};
