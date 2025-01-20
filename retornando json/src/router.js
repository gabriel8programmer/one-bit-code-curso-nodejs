const gamesController = require("./controllers/games-controller")

const express = require("express")
const router = express.Router()

router.get("/games", gamesController.index)
router.get("/games/:id", gamesController.show)

module.exports = router

