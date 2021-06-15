const request = require("supertest"); //importing supertest
const app = require("../index"); //import server
const { User, Review, Room, Reservation } = require("../models");
const jwt = require("jsonwebtoken");

let authenticationToken;
let authenticationTokenReview;
let authenticationTokenJoko;
let decoded;
let decodedJoko;
let room;
let room2;
let authenticationTokenBook1;
let authenticationTokenBook2;
let authenticationTokenBook3;
let id_reservation1;
let id_reservation2;
let reviewID;

const deleteAllData = async () => {
  await User.destroy({
    where: {},
    force: true,
  });
  await Review.destroy({
    where: {},
    force: true,
  });
  await Reservation.destroy({
    where: {},
    force: true,
  });
};

deleteAllData();
// console.log(deleteAllData())

describe("Auth Test", () => {
  describe("/auth/signup POST", () => {
    // it("it should make user and get the token", async () => {
    //   const res = await request(app)
    it("it should make user and get the token", async () => {
      const res = await request(app).post("/auth/signup").send({
        first_name: "test",
        last_name: "test",
        role: "user",
        phone_number: "08123456678",
        description: "hasdjlasdhshad",
        email: "usertest@test.com",
        password: "Aneh1234!!",
        confirmPassword: "Aneh1234!!",
      });

      // .post("/user/signup")
      // .field("email", "usertest@test.com")
      // .field("password", "Aneh1234!!")
      // .field("confirmPassword", "Aneh1234!!")
      // // .field("image", "000b2db9c9274e2168f1a22d3803fdd7.png");
      // console.log(res.body)

      // email: ,
      // password: "Aneh1234!!",
      // confirmPassword: "Aneh1234!!",
      // nama: "User Test",
      // image: "",

      // .attach('image', '000b2db9c9274e2168f1a22d3803fdd7.png')
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("sukses");
      expect(res.body).toHaveProperty("token");
      authenticationToken = res;
    });
  });
});
// });

//test the error
describe("/auth/signup POST", () => {
  it("It should error while making user", async () => {
    const res = await request(app).post("/auth/signup").send({
      first_name: "test",
      last_name: "test",

      email: "usertest@test.com",
      password: "Aneh1234!!",
      confirmPassword: "Aneh1234!!",
    });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual("Can't Create User");
  });
});

describe("/POST Sign In", () => {
  it("It should make user login and get authentication_key (jwt)", async () => {
    const res = await request(app).post("/auth/signin").send({
      email: "usertest@test.com",
      password: "Aneh1234!!",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual("sukses");
    expect(res.body).toHaveProperty("token");

    authenticationToken = res.body.token;
  });
});

// ============================================================
// Review Room Test

describe("Review Room Test", () => {
  describe("/review POST", () => {
    it("it should make user and get the token", async () => {
      const res = await request(app).post("/auth/signup").send({
        first_name: "Mike",
        last_name: "Johnson",
        email: "Mike@test.com",
        password: "Aneh1234!!",
        confirmPassword: "Aneh1234!!",
      });
      authenticationTokenReview = res.body.token;
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("sukses");
      expect(res.body).toHaveProperty("token");
    });
    it("it should make user and get the token", async () => {
      const res = await request(app).post("/auth/signup").send({
        first_name: "Joko",
        last_name: "Setiabudi",
        email: "joko@test.com",
        password: "Joko1234!!",
        confirmPassword: "Joko1234!!",
      });
      authenticationTokenJoko = res.body.token;
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("sukses");
      expect(res.body).toHaveProperty("token");
    });
  });
  describe("/review POST", () => {
    it("it should create review for room", async () => {
      decoded = jwt.verify(authenticationTokenReview, process.env.JWT_SECRET);
      room = await Room.findOne({
        where: { name: "Discovery Kartika Plaza Hotel" },
      });
      room2 = await Room.findOne({
        where: { name: "Grand Zuri Kuta" },
      });
      const res = await request(app)
        .post(`/review/room/${room.id}`)
        .set({
          Authorization: `Bearer ${authenticationTokenReview}`,
        })
        .field("user_id", decoded.id)
        .field("rating", 5)
        .field("comment", "top markotop!");

      expect(res.statusCode).toEqual(201);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Success");
      expect(res.body).toHaveProperty("data");
    });
    it("it should create review for room", async () => {
      decodedJoko = jwt.verify(authenticationTokenJoko, process.env.JWT_SECRET);
      const res = await request(app)
        .post(`/review/room/${room2.id}`)
        .set({
          Authorization: `Bearer ${authenticationTokenJoko}`,
        })
        .field("user_id", decodedJoko.id)
        .field("rating", 3)
        .field("comment", "mending cari yang lain dah!");

      expect(res.statusCode).toEqual(201);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Success");
      expect(res.body).toHaveProperty("data");
    });
  });
});

describe("/review GET", () => {
  it("it should get all review for specific room", async () => {
    const res = await request(app)
      .get(`/review/room/${room.id}`)
      .set({
        Authorization: `Bearer ${authenticationTokenReview}`,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual("Success");
    expect(res.body).toHaveProperty("data");
  });
});

describe("/review PUT", () => {
  it("it should be able to update specific review for specific room", async () => {
    const res = await request(app)
      .put(`/review/room/${room.id}`)
      .set({
        Authorization: `Bearer ${authenticationTokenReview}`,
      })
      .field("user_id", decoded.id)
      .field("rating", 2)
      .field("comment", "jeleeek!");

    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual("Success");
    expect(res.body).toHaveProperty("data");
  });
});
describe("/review DELETE", () => {
  it("it should be able to delete specific review for specific room", async () => {
    review = await Review.findOne({
      where: { user_id: decoded.id },
    });

    const res = await request(app)
      .delete(`/review/room/${room.id}`)
      .set({
        Authorization: `Bearer ${authenticationTokenReview}`,
      })
      .send({ user_id: `${decoded.id}` });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual("Success delete review");
  });
});

// ============================================================
// Review User Test

describe("Review User Test", () => {
  describe("/review GET", () => {
    it("it should get all review for specific user", async () => {
      const review = await request(app)
        .post(`/review/room/${room2.id}`)
        .set({
          Authorization: `Bearer ${authenticationTokenReview}`,
        })
        .field("user_id", decoded.id)
        .field("rating", 3)
        .field("comment", "coba dulu aaah!");

      const res = await request(app)
        .get(`/review/user/${decoded.id}`)
        .set({
          Authorization: `Bearer ${authenticationTokenReview}`,
        });

      reviewID = res.body.data[0].id;

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Success");
      expect(res.body).toHaveProperty("data");
    });
  });
  describe("/review GET", () => {
    it("it should get specific review for specific user", async () => {
      const res = await request(app)
        .get("/review")
        .query({ user_id: decoded.id })
        .query({ review_id: reviewID })
        .set({
          Authorization: `Bearer ${authenticationTokenReview}`,
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Success");
      expect(res.body).toHaveProperty("data");
    });
  });

  describe("/review PUT", () => {
    it("it should be able to update specific review for specific user", async () => {
      const res = await request(app)
        .put(`/review/user/${decoded.id}`)
        .query({ review_id: reviewID })
        .field("rating", 2)
        .field("comment", "ralat rating!")
        .set({
          Authorization: `Bearer ${authenticationTokenReview}`,
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Success");
      expect(res.body).toHaveProperty("data");
    });
  });
  describe("/review DELETE", () => {
    it("it should be able to delete specific review for specific user", async () => {
      const res = await request(app)
        .delete(`/review/user/${decoded.id}`)
        .query({ review_id: reviewID })
        .set({
          Authorization: `Bearer ${authenticationTokenJoko}`,
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Success delete review");
    });
  });
});
// ============================================================
// Create reservation Room Test

describe("create reservation", () => {
  it("it should make user and get the token", async () => {
    const res = await request(app).post("/auth/signup").send({
      first_name: "test",
      last_name: "of Reservation",
      email: "reserve@gmail.com",
      password: "Aneh1234!!",
      confirmPassword: "Aneh1234!!",
    });
    authenticationTokenBook1 = res.body.token;
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual("sukses");
    expect(res.body).toHaveProperty("token");
  });

  it("it should make reservation", async () => {
    const res = await request(app)
      .post("/reservation/room")
      .query({ id_room: `7` })
      .send({
        firstName: "test",
        lastName: "of Reservation",
        email: "reserve@gmail.com",
        phone: `0821234567890`,
        number: `2`,
        start: `2021/07/27`,
        end: `2021/07/28`,
      })
      .set({
        Authorization: `Bearer ${authenticationTokenBook1}`,
      });
    id_reservation1 = res.body.data.id;
    // id_reservation1=res.data.id
    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual(["success", "Email sent"]);
  });

  it("it is error because start_date is not correct", async () => {
    const res = await request(app)
      .post("/reservation/room")
      .query({ id_room: `7` })
      .send({
        firstName: "test",
        lastName: "of Reservation",
        email: "reserve@gmail.com",
        phone: `0821234567890`,
        number: `2`,
        start: `2021/7/7`,
        end: `2021/07/28`,
      })
      .set({
        Authorization: `Bearer ${authenticationTokenBook1}`,
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual(
      "start_date is not correct, please select correct date range"
    );
  });

  it("it is error because min 24 hrs before booking date", async () => {
    const res = await request(app)
      .post("/reservation/room")
      .query({ id_room: `7` })
      .send({
        firstName: "test",
        lastName: "of Reservation",
        email: "reserve@gmail.com",
        phone: `0821234567890`,
        number: `2`,
        start: `2021/03/03`,
        end: `2021/06/10`,
      })
      .set({
        Authorization: `Bearer ${authenticationTokenBook1}`,
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual("min 24 hrs before booking date");
  });

  it("it is error because end_date is not correct", async () => {
    const res = await request(app)
      .post("/reservation/room")
      .query({ id_room: `7` })
      .send({
        firstName: "test",
        lastName: "of Reservation",
        email: "reserve@gmail.com",
        phone: `0821234567890`,
        number: `2`,
        start: `2021/07/07`,
        end: `2021/7/8`,
      })
      .set({
        Authorization: `Bearer ${authenticationTokenBook1}`,
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual("end_date is not correct");
  });

  it("it is error because date range is not correct", async () => {
    const res = await request(app)
      .post("/reservation/room")
      .query({ id_room: `7` })
      .send({
        firstName: "test",
        lastName: "of Reservation",
        email: "reserve@gmail.com",
        phone: `0821234567890`,
        number: `2`,
        start: `2021/07/07`,
        end: `2021/07/04`,
      })
      .set({
        Authorization: `Bearer ${authenticationTokenBook1}`,
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual("please select correct date range");
  });

  it("it is error because name is less than 3 char", async () => {
    const res = await request(app)
      .post("/reservation/room")
      .query({ id_room: `7` })
      .send({
        firstName: "",
        lastName: "of",
        email: "reserve@gmail.com",
        phone: `0821234567890`,
        number: `2`,
        start: `2021/07/07`,
        end: `2021/07/08`,
      })
      .set({
        Authorization: `Bearer ${authenticationTokenBook1}`,
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual("please put your name");
  });

  it("it is error because email is not correct", async () => {
    const res = await request(app)
      .post("/reservation/room")
      .query({ id_room: `7` })
      .send({
        firstName: "test",
        lastName: "of Reservation",
        email: "reserve",
        phone: `0821234567890`,
        number: `2`,
        start: `2021/07/07`,
        end: `2021/07/08`,
      })
      .set({
        Authorization: `Bearer ${authenticationTokenBook1}`,
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual("email field must be valid");
  });

  it("it is error because number occupancy is not correct", async () => {
    const res = await request(app)
      .post("/reservation/room")
      .query({ id_room: `7` })
      .send({
        firstName: "test",
        lastName: "of Reservation",
        email: "reserve@mail.com",
        phone: `0821234567890`,
        number: `21`,
        start: `2021/07/07`,
        end: `2021/07/08`,
      })
      .set({
        Authorization: `Bearer ${authenticationTokenBook1}`,
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual("room occupancy is invalid");
  });

  it("it is error because occupancy number is not number", async () => {
    const res = await request(app)
      .post("/reservation/room")
      .query({ id_room: `7` })
      .send({
        firstName: "test",
        lastName: "of Reservation",
        email: "reserve@mail.com",
        phone: `08123456789`,
        number: `not number`,
        start: `2021/07/07`,
        end: `2021/07/08`,
      })
      .set({
        Authorization: `Bearer ${authenticationTokenBook1}`,
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual("please put correct number");
  });

  it("it is error because room is invalid", async () => {
    const res = await request(app)
      .post("/reservation/room")
      .query({ id_room: `7000` })
      .send({
        firstName: "test",
        lastName: "of Reservation",
        email: "reserve@mail.com",
        phone: `2020202020`,
        number: `2`,
        start: `2021/07/07`,
        end: `2021/07/08`,
      })
      .set({
        Authorization: `Bearer ${authenticationTokenBook1}`,
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual("room is invalid");
  });

  it("it is error because phone number is not number", async () => {
    const res = await request(app)
      .post("/reservation/room")
      .query({ id_room: `7` })
      .send({
        firstName: "test",
        lastName: "of Reservation",
        email: "reserve@mail.com",
        phone: `nut number`,
        number: `2`,
        start: `2021/07/07`,
        end: `2021/07/08`,
      })
      .set({
        Authorization: `Bearer ${authenticationTokenBook1}`,
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual("please put correct phone number");
  });

  it("it should error because already reserved", async () => {
    const res = await request(app)
      .post("/reservation/room")
      .query({ id_room: `7` })
      .send({
        firstName: "test",
        lastName: "of Reservation",
        email: "reserve@gmail.com",
        phone: `0821234567890`,
        number: `2`,
        start: `2021/07/27`,
        end: `2021/07/28`,
      })
      .set({
        Authorization: `Bearer ${authenticationTokenBook1}`,
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual("date is unavailable");
  });
});

describe("Re-schedule reservation", () => {
  it("it should make reservation", async () => {
    const res = await request(app)
      .post("/reservation/room")
      .query({ id_room: `7` })
      .send({
        firstName: "test",
        lastName: "of Reservation",
        email: "reserve@gmail.com",
        phone: `0821234567890`,
        number: `2`,
        start: `2021/07/26`,
        end: `2021/07/27`,
      })
      .set({
        Authorization: `Bearer ${authenticationTokenBook1}`,
      });
    id_reservation2 = res.body.data.id;
    // id_reservation1=res.data.id
    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual(["success", "Email sent"]);
  });

  it("it should change reservation", async () => {
    const res = await request(app)
      .put("/reservation/order")
      .query({ id_room: `7` })
      .send({
        id_reservation: `${id_reservation1}`,
        start: `2021/07/27`,
        end: `2021/07/28`,
      })
      .set({
        Authorization: `Bearer ${authenticationTokenBook1}`,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual("Success");
  });

  it("it should change reservation", async () => {
    const res = await request(app)
      .put("/reservation/order")
      .query({ id_room: `7` })
      .send({
        id_reservation: `${id_reservation2}`,
        start: `2021/07/27`,
        end: `2021/07/28`,
      })
      .set({
        Authorization: `Bearer ${authenticationTokenBook1}`,
      });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual("date is unavailable");
  });
});
