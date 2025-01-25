const usersModels = require("../models/users-models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports = {
    //POST /auth/register
    register: (req, res) => {
        const { name, email, password } = req.body

        if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
            return res.status(400).json({ message: "Required all fields!" })
        }

        const emailIsAlreadyExists = usersModels.getUserByEmail(email)
        if (emailIsAlreadyExists) {
            return res.status(401).json({ message: "Email is already in use!" })
        }

        const newUser = usersModels.createUser({ name, email, password })
        res.status(201).json({ ...newUser })
    },

    //POST /auth/login
    login: (req, res) => {
        const { email, password } = req.body

        if (typeof email !== "string" || typeof password !== "string") {
            return res.status(400).json({ message: "Required all fields!" })
        }

        const user = usersModels.getUserByEmail(email)
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: "Invalid email or password!" })
        }

        const payload = { id: user.id, email: user.email }
        const jwtKey = process.env.JWT_KEY
        const token = jwt.sign(payload, jwtKey, { expiresIn: "1d" })
        res.json({ token })
    }
}