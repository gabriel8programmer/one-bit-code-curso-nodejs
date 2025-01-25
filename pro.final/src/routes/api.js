
const express = require("express")
const apiController = require("../controllers/api-controller")
const apiRouter = express.Router()

apiRouter.get("/api/books", apiController.index)
apiRouter.get("/api/books/:id", apiController.show)
apiRouter.post("/api/books", apiController.create)
apiRouter.put("/api/books/:id", apiController.update)
apiRouter.delete("/api/books/:id", apiController.delete)

module.exports = apiRouter