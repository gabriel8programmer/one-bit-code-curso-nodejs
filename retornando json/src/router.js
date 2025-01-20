const gamesController = require("./controllers/games-controller")

const express = require("express")
const router = express.Router()

router.get("/games", gamesController.index)
router.get("/games/:id", gamesController.show)
router.post("/games", gamesController.save)
router.post("/games/:id/genres", gamesController.addGenre)
router.put("/games/:id", gamesController.update)

module.exports = router

