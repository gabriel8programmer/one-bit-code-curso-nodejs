const users = require("../models/users-model")

module.exports = {
    //GET /dashboard
    dashboard: (req, res) => {
        res.render("dashboard", { user: req.session.user })
    },

    //GET /dashboard/users
    users: (req, res) => {
        res.render("users", { users })
    }
}