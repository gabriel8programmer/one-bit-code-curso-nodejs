
const users = require("../models/users-model")
const express = require("express")
const authRouter = express.Router()
const jwt = require("jsonwebtoken")

const secretKey = "palavra_chave_secreta"

authRouter.post("/register", (req, res) => {
    const { username, password } = req.body

    const user = { username, password }
    users.push(user)

    res.status(201).json(user)
})

authRouter.post("/login", (req, res) => {
    const { username, password } = req.body

    const user = users.find(user => user.username === username)

    if (!user || user.password !== password) {
        return res.status(404).json({ message: "Invalid Credentials!" })
    }

    const playload = { username }

    const token = jwt.sign(playload, secretKey, { expiresIn: '1h' })

    res.status(200).json({ token })
})

module.exports = authRouter 