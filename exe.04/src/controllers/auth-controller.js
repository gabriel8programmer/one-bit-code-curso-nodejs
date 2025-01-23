const jsonSecretKey = require("../config/jsonSecretKey")
const users = require("../models/users-model")
const jwt = require("jsonwebtoken")

module.exports = {

    //POST /auth/register
    register: (req, res) => {
        const { name, email, password } = req.body

        if (!name || !password || !email) {
            return res.status(404).json({ message: "Invalid Credentials!" })
        }

        const userEmailIsAlreadyExists = users.find(user => user.email === email)
        if (userEmailIsAlreadyExists) {
            return res.status(404).json({ message: "Email is Already Exists!" })
        }

        const user = {
            id: Math.floor(Math.random() * 9999999),
            name, email, password, role: "standard"
        }

        users.push(user)
        res.status(201).json(user)
    },

    //POST /auth/login
    login: (req, res) => {
        const { email, password } = req.body

        const user = users.find(user => user.email === email)
        if (!user || user.password !== password) {
            return res.status(400).json({ message: "Invalid Credentials!" })
        }

        const payload = { email }
        const token = jwt.sign(payload, jsonSecretKey, { expiresIn: "1h" })

        res.status(200).json({ token })
    }
}