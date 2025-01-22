
const express = require("express")
const authMiddleware = require("../middlewares/auth-middleware")
const protectedRouter = express.Router()

protectedRouter.get("/dashboard", authMiddleware, (req, res) => {
    const username = req.authenticatedUser.username
    res.status(200).json({ message: `Bem vindo(a) ${username}` })
})

module.exports = protectedRouter