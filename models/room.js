"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "user_id" });
      this.hasMany(models.Media, {foreignKey: 'room_id'})
    }
  }
  Room.init({
      user_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      total_occupancy: DataTypes.INTEGER,
      total_bedrooms: DataTypes.INTEGER,
      total_bathroom: DataTypes.INTEGER,
      summary: DataTypes.TEXT,
      address: DataTypes.STRING,
      has_air_con: DataTypes.BOOLEAN,
      has_internet: DataTypes.BOOLEAN,
      price: DataTypes.INTEGER,
      cancelation_policy: DataTypes.TEXT,
      location: DataTypes.JSON,
      foodandbeverage: DataTypes.JSON,
      service: DataTypes.JSON,
      parkandtransport: DataTypes.JSON,
      healthy: DataTypes.JSON,
      accessibility: DataTypes.BOOLEAN,
      pets_allowed: DataTypes.BOOLEAN
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      modelName: "Room",
    }
  );
  return Room;
};
