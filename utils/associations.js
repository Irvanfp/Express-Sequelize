const { User, Review, Room, Reservation, Media } = require("../models");

// user and review relationship
User.hasMany(Review, { foreignKey: "user_id" });
Review.belongsTo(User, { foreignKey: "user_id" });

// room and review relationship
Room.hasMany(Review, { foreignKey: "room_id" });
Review.belongsTo(Room, { foreignKey: "room_id" });

//reservation with Room and User
Reservation.belongsTo(Room, { foreignKey: "id_room" });
Reservation.belongsTo(User, { foreignKey: "id_user" });
Room.hasMany(Reservation, { foreignKey: "id_room" });
User.hasMany(Reservation, { foreignKey: "id_user" });

Room.hasMany(Media, { foreignKey: "room_id" });
Media.belongsTo(Room, { foreignKey: "room_id" });
