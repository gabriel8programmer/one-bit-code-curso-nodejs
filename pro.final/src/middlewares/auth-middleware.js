
const jwt = require("jsonwebtoken")
const usersModels = require("../models/users-models")

module.exports = {
    ensureAuth: (req, res, next) => {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).json({ message: "Invalid token!" })
        }

        const token = authHeader.split(" ")[1]

        try {
            const jwtKey = process.env.JWT_KEY
            const { id } = jwt.verify(token, jwtKey)
            const user = usersModels.getUserById(id)
            if (!user) return res.status(404).json({ message: "User not found!" })
            req.user = user
            next()
        } catch (error) {
            return res.status(401).json({ message: error.message })
        }
    }
}