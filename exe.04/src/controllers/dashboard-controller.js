
module.exports = {
    //GET /dashboard
    index: (req, res) => {
        const { name } = req.authenticatedUser
        const username = name ? name : "Visitante"
        res.json({ message: `Bem vindo ${username}!` })
    }
}