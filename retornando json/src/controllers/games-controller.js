
const games = [
    { id: 1, name: 'Legend of Mana', genres: ['action-rpg'], year: 1999 },
    { id: 2, name: 'World of Warcraft', genres: ['mmorpg'], year: 2004 },
    { id: 3, name: 'Metal Gear Solid', genres: ['stealth', 'action-adventure'], year: 1998 },
    { id: 4, name: 'Sonic Adventure 2', genres: ['platformer'], year: 2001 },
    { id: 5, name: 'Age of Empires 2', genres: ['real-time-strategy'], year: 1999 }
]

module.exports = {
    //GET /games
    index: (req, res) => {
        res.json(games)
    },

    //GET /games/:id
    show: (req, res) => {
        const { id } = req.params

        const game = games.find(game => game.id === +id)

        if (game) {
            res.json(game)
        } else {
            res.status(404).json({ message: "Game Not Found" })
        }
    },

    //POST /games
    save: (req, res) => {
        const { name, genres, year } = req.body

        const newGame = {
            id: Math.floor(Math.random() * 9999999),
            name,
            genres,
            year
        }

        games.push(newGame)
        res.status(201).json(newGame)
    },

    //PUT /games/:id

    //DELETE /games/:id

    //POST /games/:id/genres/
    addGenre: (req, res) => {
        const { id } = req.params
        const { genre } = req.body

        const gameIndex = games.findIndex(game => game.id === +id)

        if (gameIndex === -1) {
            return res.status(404).json({ message: "Game Not Found!" })
        }

        if (typeof genre !== "string" || games[gameIndex].genres.includes(genre)) {
            return res.status(404).json({ message: "Invalid Genre!" })
        }

        games[gameIndex].genres.push(genre)
        res.status(201).json(games[gameIndex])
    }
}