const {Room, Media, Reservation, sequelize } = require('../models')
const { Op } = require("sequelize");

class RoomController {

  getAllandFilter = async (req, res) => {
    try {
      let ratings, states;
      // old query for like method
      // const query = (req.query.state) ? req.query.state.toLowerCase() : ''
      if(req.query.state){
        const arr = req.query.state.split(',')
        // console.log(arr)
        states = { location: {
            state: { [Op.in]: arr }
        }}
      } else {
        states = { location: sequelize.where(sequelize.fn('lower', sequelize.literal(`location->"$.state"`)), 'LIKE', '%%')}
      }
      if(req.query.rating){
        ratings = JSON.parse(req.query.rating)
      } else {
        ratings = [1,2,3,4,5]
      }

      const data = await Room.findAll({
        where: {
          rating: ratings,
          [Op.and]:[
            {price: {[Op.gte]: req.query.minprice || 0}},
            {price: {[Op.lte]: req.query.maxprice || 9999999999999}}
          ],
          // location: sequelize.where(sequelize.fn('lower', sequelize.literal(`location->"$.state"`)), 'LIKE', '%kuta%')
          location: states.location,
          
        },
        include: [
          {
            model: Media,
            attributes: ['file_name']
          }
        ]
      })
      for(let i of data){
        i.dataValues['defaultImages'] = "images/default.jpeg"
      }
      return res.status(200).json({
        message: "Success",
        totalData: data.length,
        data,
      })
    } catch (error) {
      return res.status(500).json({
        message: "internal server error",
        error: error.message
      })
    }
  }

  getByCity = async (req, res) => {
    try {
      const exclude = []

      if(req.query.checkin && req.query.checkout){
        const findExclude = await Reservation.findAll({
          where: { [Op.and]: [
              { start_date: new Date(req.query.checkin) },
              { end_date: new Date(req.query.checkout) },
              { [Op.or]: [
                { status: "approved" },
                { status: "pending" }
              ]}  
            ]}
        })
        for(let j of findExclude){
          if(!exclude.includes(j.id_room)){
            exclude.push(j.id_room)
          }
        }
      }
      
      const query = (req.query.loc) ? req.query.loc.toLowerCase() : ''
      const data = await Room.findAll({
        where: {
          id: {
            [Op.notIn]: exclude
          },
          location: sequelize.where(sequelize.fn('lower', sequelize.literal(`location->"$.city"`)), 'LIKE', `%${query}%`),
          total_occupancy: {[Op.gte]: req.query.guest || 0}
        },
        include: [
          {
            model: Media,
            attributes: ['file_name']
          }
        ]
      })
      // if strict to number of guest
      // (req.query.guest && req.query.guest != 0) ? req.query.guest : 1
      for(let i of data){
        i.dataValues['defaultImages'] = "images/default.jpeg"
      }
      return res.status(200).json({
        message: `Search by ${req.query.loc} location`,
        totalData: data.length,
        data,
      })
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message
      })
    }
  }

  getAllState = async(req, res) => {
    try {
      const data = await Room.findAll({})
      const state = []
      data.forEach(e => {
        if(!state.includes(e['location']['state'])){
          state.push(e['location']['state'])
        }
      });
      return res.status(200).json({
        message: "all state data",
        data: state
      })
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message
      }) 
    }
  }

  getDetail = async (req, res) => {
    try {
      const data = await Room.findOne({ 
        where: req.params, 
        include: [
          { model: Media,
            attributes: ['file_name']
          }
        ] 
      })
      // give default image
      data.dataValues['defaultImages'] = "images/default.jpeg"
      return res.status(200).json({
        message: `Get ${data.name} detail`,
        data
      })
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message
      })
    }
  }
}

module.exports = new RoomController();