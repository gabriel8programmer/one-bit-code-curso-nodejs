
const jwt = require("jsonwebtoken")
const users = require("../models/users-model")

const secretKey = "palavra_chave_secreta"

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: "Authorization is required!" })
    }

    const token = authHeader.split(" ")[1]

    try {

        const decodedToken = jwt.decode(token, secretKey)

        const user = users.find(user => user.username === decodedToken.username)
        if (!user) {
            return res.status(404).json({ message: "Invalid Token!" })
        }

        req.authenticatedUser = user

        next()

    } catch (error) {
        return res.status(404).json({ message: "Invalid token!" })
    }
}

module.exports = authMiddleware