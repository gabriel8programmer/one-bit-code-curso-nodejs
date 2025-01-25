const booksModel = require("../models/books-model")

module.exports = {
    //GET /api/books
    index: (req, res) => {
        const books = booksModel.getBooks()
        res.json(books)
    },

    //GET /api/books/:id
    show: (req, res) => {
        const { id } = req.params
        const book = booksModel.getBookById(id)
        if (!book) throw new Error("Book not found!")
        res.json(book)
    },

    //POST /api/books
    create: (req, res) => {
        const { title, author, quantityAvailable } = req.body
        if (typeof title !== "string" || typeof author !== "string" || !parseInt(quantityAvailable)) {
            return res.status(401).json({ message: "invalid fields!" })
        }
        const newBook = booksModel.createBook({ title, author, quantityAvailable })
        res.status(201).json(newBook)
    },

    //PUT /api/books/:id
    update: (req, res) => {
        const { id } = req.params
        const { title, author, quantityAvailable } = req.body
        const fieldsToUpdate = {}

        if (typeof title === "string") fieldsToUpdate.title = title
        if (typeof author === "string") fieldsToUpdate.author = author
        if (typeof quantityAvailable === "number") fieldsToUpdate.quantityAvailable = quantityAvailable

        const updatedBook = booksModel.udpateBook(id, fieldsToUpdate)
        res.json(updatedBook)
    },

    //DELETE /api/books/:id
    delete: (req, res) => {
        const { id } = req.params
        const deletedBook = booksModel.deleteBook(id)
        res.json(deletedBook)
    }
}