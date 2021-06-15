const e = require("express");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

class AuthController {
  async getToken(req, res) {
    try {
      //get the req.user from authRoutes
      // and create body variable
      // console.log(req.user.id)
      const body = {
        id: req.user.id,
        //  role: req.user.role,
        //  nama: req.user.nama,
      };

      //create jwt token with  {user{id: req.user._id}}value
      //and the key is porcess.env.JWT_SECRET
      const token = jwt.sign(body, process.env.JWT_SECRET);


       //============================ node mailer=============================
       const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASSWORD,
        },
      });

      const mailOptions = {
        from: "travelookga11@gmail.com",
        to: req.body.email,
        subject: "You are part of Travelook now !",
        // text: `Thank you for registering to Travelook, your account already activated. Enjoy your trip ${req.body.first_name} !`,
        html: `<h4>Thank you for registering to Travelook, your account already activated. Enjoy your trip ${req.body.first_name} !</h4><img src="https://i.ibb.co/wQFFtSK/Screenshot-from-2021-05-20-14-05-29.png">`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      //=======================================================================

      //if success
      return res.status(200).json({
        message: "sukses",
        token,
      });
    } catch (e) {
      //if error
      console.log(e);
      return res.status(500).json({
        message: "internal server error",
        error: e,
      });
    }
  }

  async update(req, res) {
    try {
      // Update data

      let updatedData = await User.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      // If success
      console.log(updatedData);
      return res.status(201).json({
        message: "Success",
        updatedData,
      });
    } catch (e) {
      console.log(e)
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  //show user User
  async getOne(req, res) {
    try {
      let data = await User.findOne({
        where:{
          id: req.user.id,
        }
       
      });
      console.log(data)

      return res.status(200).json({
        message: "Here is your Profile",
        data,

        // return res.status(200).send(data.nama);
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

   //delete user
   async delete(req, res) {
    try {
      // delete data
      await User.destroy({ where: {id: req.user.id} });

      return res.status(200).json({
        message: "Success",
      });
    } catch (e) {
      console.log(e)
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
  //get All user
  async getAll(req, res) {
    try {
      let data = await User.findAll();

      //if no data
      if (!data.length) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      //if success
      return res.status(200).json({
        message: "success",
        data,
      });
    } catch (e) {
      console.log(e)
      return res.status(500).json({
        message: "internal server error",
        error: e,
      });
    }
  }
}

module.exports = new AuthController();
