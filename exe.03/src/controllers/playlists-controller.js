
const playlists = [{
    id: 1,
    name: "rock",
    tags: ["rock", "metal", "heavy metal"],
    musics: [{
        id: 1,
        title: "musica teste",
        year: 1994,
        artist: "artista teste",
        album: "álbum teste"
    }]
}]

module.exports = {
    //GET /playlists
    index: (req, res) => {
        res.status(200).json(playlists)
    },

    //GET /playlists/:id
    show: (req, res) => {
        const { id } = req.params
        const playlist = playlists.find(playlist => playlist.id === +id)

        if (!playlist) {
            return res.status(404).json({ message: "Playlist Not Found!" })
        }

        res.status(200).json(playlist)
    },

    //POST /playlists
    save: (req, res) => {
        const { name, tags, musics } = req.body

        if (!name || !tags) {
            return res.status(404).json({ message: "Name or tag Invalid!" })
        }

        const validMusics = !musics ? [] : musics

        const newPlaylist = {
            id: Math.floor(Math.random() * 9999999),
            name,
            tags,
            musics: validMusics
        }

        playlists.push(newPlaylist)
        res.status(201).json(newPlaylist)
    },

    //PUT /playlists/:id
    update: (req, res) => {
        const { id } = req.params
        const { name, tags } = req.body

        const playlistIndex = playlists.findIndex(playlist => playlist.id === +id)

        if (playlistIndex === -1) {
            return res.status(404).json({ message: "Playlist Not Found!" })
        }

        if (typeof name === "string") {
            playlists[playlistIndex].name = name
        }

        if (typeof tags === "object" && tags.length > 0) {
            playlists[playlistIndex].tags = tags
        }

        res.status(200).json(playlists[playlistIndex])
    },

    //DELETE /playlists/:id
    delete: (req, res) => {
        const { id } = req.params

        const playlistIndex = playlists.findIndex(playlist => playlist.id === +id)

        if (playlistIndex === -1) {
            return res.status(404).json({ message: "Playlist Not Found!" })
        }

        playlists.splice(playlistIndex, 1)
        res.status(204).end()
    },

    //POST /playlists/:id/musics
    addMusic: (req, res) => {
        const { id } = req.params
        const { title, year, artist, album } = req.body

        const playlistIndex = playlists.findIndex(playlist => playlist.id === +id)

        if (playlistIndex === -1) {
            return res.status(404).json({ message: "Playlist Not Found!" })
        }

        if (!title || !year || !artist || !album) {
            return res.status(404).json("Invalid Datas!")
        }

        const newMusic = {
            title,
            year,
            artist,
            album
        }

        playlists[playlistIndex].musics.push(newMusic)
        res.status(201).json(playlists[playlistIndex])
    },

    //DELETE /playlists/:id/musics/:name
    removeMusic: (req, res) => {
        const { id, title } = req.params
        const playlistIndex = playlists.findIndex(playlist => playlist.id === +id)

        if (playlistIndex === -1) {
            return res.status(404).json({ message: "Playlist Not Found!" })
        }

        if (typeof title !== "string" ||
            playlists[playlistIndex].musics.findIndex(music => music.title === title) === -1) {
            return res.status(404).json({ message: "Invalid Music!" })
        }

        playlists[playlistIndex].musics = playlists[playlistIndex].musics.filter(music => music.title !== title)
        res.status(204).end()
    }
}