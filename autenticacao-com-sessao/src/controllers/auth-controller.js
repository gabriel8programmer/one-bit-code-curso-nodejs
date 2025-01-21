let users = [
    { username: "teste1", password: "12345" },
    { username: "teste2", password: "54321" }
]

module.exports = {
    //GET /
    index: (req, res) => {
        res.render("index")
    },

    //POST /auth/register
    register: (req, res) => {
        const { username, password } = req.body

        const userIsAlreadyExists = users.find(user => user.username === username)

        if (userIsAlreadyExists) {
            return res.redirect("/")
        }

        const user = { username, password }
        users.push(user)
        res.redirect("/dashboard")
    },

    //POST /auth/login
    login: (req, res) => {
        const { username, password } = req.body

        const user = users.find(user => user.username === username)

        if (!user) {
            return res.redirect("/")
        }

        if (user.password !== password) {
            return res.redirect("/")
        }

        req.session.authenticated = true
        req.session.user = user

        res.redirect("/dashboard")
    },

    //GET /auth/logout
    logout: (req, res) => {
        req.session.authenticated = false
        req.session.user = null
        res.redirect("/")
    }
}