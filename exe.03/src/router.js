
const express = require("express")
const playlistsController = require("./controllers/playlists-controller")
const router = express.Router()

router.get("/playlists", playlistsController.index)
router.get("/playlists/:id", playlistsController.show)
router.post("/playlists", playlistsController.save)
router.post("/playlists/:id/musics", playlistsController.addMusic)
router.put("/playlists/:id", playlistsController.update)
router.delete("/playlists/:id", playlistsController.delete)
router.delete("/playlists/:id/musics/:title", playlistsController.removeMusic)

module.exports = router