const jwt = require("jsonwebtoken")
const users = require("../models/users-model")
const jsonSecretKey = require("../config/jsonSecretKey")

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        req.authenticatedUser = {}
        next()
    }

    const token = authHeader.split(" ")[1]

    try {

        const decodedToken = jwt.verify(token, jsonSecretKey)
        const { email } = decodedToken
        const user = users.find(user => user.email === email)
        if (!user) {
            return res.status(404).json({ message: "Invalid token!" })
        }

        req.authenticatedUser = user
        next()

    } catch (error) {
        res.status(404).json({ message: "Invalid token!" })
        throw error
    }
}

const ensureUserIsAdmin = (req, res, next) => {
    const { role } = req.authenticatedUser
    if (role === "admin") {
        next()
    } else {
        return res.status(404).json({ message: "User is not admin!" })
    }
}

module.exports = { authMiddleware, ensureUserIsAdmin }