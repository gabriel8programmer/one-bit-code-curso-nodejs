const HttpError = require("../errors/HTTPError")

const uuid = require("uuid").v4

let books = [
    { id: "1", title: "Title 1", author: "Author 1", quantityAvailable: 10 }
]

module.exports = {
    getBooks: () => books,

    getBookById: (id) => books.find(book => book.id === id),

    createBook: ({ title, author, quantityAvailable }) => {
        const newBook = {
            id: uuid(),
            title,
            author,
            quantityAvailable
        }

        books.push(newBook)
        return newBook
    },

    udpateBook: (id, updatedBook) => {
        const bookIndex = books.findIndex(book => book.id === id)
        if (bookIndex === -1) throw new HttpError(404, "Book is not found!")
        books[bookIndex] = { ...books[bookIndex], ...updatedBook }
        return books[bookIndex]
    },

    deleteBook: (id) => {
        const bookIndex = books.findIndex(book => book.id === id)
        if (bookIndex === -1) throw new HttpError(404, "Book is not found!")
        const deletedBook = books.splice(bookIndex, 1)
        books = books.filter(book => book.id !== id)
        return deletedBook
    },

    takeBook: (id) => {
        const bookIndex = books.findIndex(book => book.id === id)
        if (bookIndex === -1) throw new HttpError(404, "Book is not found!")
        books[bookIndex].quantityAvailable -= 1
    },

    returnBook: (id) => {
        const bookIndex = books.findIndex(book => book.id === id)
        if (bookIndex === -1) throw new HttpError(404, "Book is not found!")
        books[bookIndex].quantityAvailable += 1
    }
}