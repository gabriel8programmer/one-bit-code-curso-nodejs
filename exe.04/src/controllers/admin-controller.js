const users = require("../models/users-model")

module.exports = {
    //GET /admin/users
    getAllUsers: (req, res) => {
        res.status(200).json(users)
    },

    //GET /admin/users/:id
    showUser: (req, res) => {
        const { id } = req.params
        const user = users.find(user => user.id === +id)
        if (!user) {
            return res.status(404).json({ message: "User not found!" })
        }
        res.status(200).json(user)
    },

    //POST /admin/users
    createUser: (req, res) => {
        const { name, email, password, role } = req.body

        if (!name || !email || !password) {
            return res.status(404).json({ message: "Invalid Credentials!" })
        }

        const userEmailIsAlreadyExists = users.find(user => user.email === email)
        if (userEmailIsAlreadyExists) {
            return res.status(404).json({ message: "Email is Already Exists!" })
        }

        const newUser = {
            id: Math.floor(Math.random() * 99999999),
            name, email, password, role: role ?? "standard"
        }

        users.push(newUser)
        res.status(201).json(newUser)
    },

    //DELETE /admin/users/:id
    deleteUser: (req, res) => {
        const { id } = req.params

        const userId = users.findIndex(user => user.id === +id)
        if (userId === -1) {
            return res.status(404).json({ message: "User not found!" })
        }
        const userRemoved = users.splice(userId, 1)

        res.status(200).json(userRemoved)
    }


}