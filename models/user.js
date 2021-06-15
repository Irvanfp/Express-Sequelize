"use strict";
const bcrypt = require("bcrypt");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      role: DataTypes.STRING,
      email: DataTypes.STRING,
      password: {type: DataTypes.STRING, set(value){
        this.setDataValue("password", bcrypt.hashSync(value, 10));
      }},
      phone_number: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      reservation_id: DataTypes.INTEGER,
      review_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    },
   );

  return User;
};
