
module.exports = {
    //GET /dashboard
    dashboard: (req, res) => {
        res.render("dashboard", { user: req.session.user })
    }
}