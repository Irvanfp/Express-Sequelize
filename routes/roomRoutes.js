const router = require("express").Router();

const RoomController = require('../controllers/RoomController')

router.get('/', RoomController.getAllandFilter)
router.get('/loc', RoomController.getByCity)
router.get('/state', RoomController.getAllState)
router.get('/detail/:id', RoomController.getDetail)

module.exports = router