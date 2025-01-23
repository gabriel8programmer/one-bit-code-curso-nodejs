
const express = require("express")
const adminController = require("../controllers/admin-controller")
const { authMiddleware, ensureUserIsAdmin } = require("../middlewares/auth-middleware")
const adminRouter = express.Router()

adminRouter.get("/", authMiddleware, ensureUserIsAdmin, (req, res) => res.json({ message: "Welcome admin!" }))

adminRouter.get("/users", authMiddleware, ensureUserIsAdmin, adminController.getAllUsers)
adminRouter.get("/users/:id", authMiddleware, ensureUserIsAdmin, adminController.showUser)
adminRouter.post("/users", authMiddleware, ensureUserIsAdmin, adminController.createUser)
adminRouter.delete("/users/:id", authMiddleware, ensureUserIsAdmin, adminController.deleteUser)

module.exports = adminRouter