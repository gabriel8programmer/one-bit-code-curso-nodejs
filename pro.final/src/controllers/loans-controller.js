const HttpError = require("../errors/HTTPError")
const booksModel = require("../models/books-model")
const loansModel = require("../models/loans-model")

module.exports = {

    index: (req, res) => {
        const loans = loansModel.getAllLoans()
        res.json(loans)
    },

    show: (req, res) => {
        const { id } = req.params
        const loan = loansModel.getLoanById(id)
        if (!loan) throw new HttpError(404, "Loan is not found!")
        res.json(loan)
    },

    //POST /admin/loans
    create: (req, res) => {
        const user = req.user
        const { bookId } = req.body

        if (typeof bookId !== "string") throw new HttpError(404, "Invalid book id!")

        const book = booksModel.getBookById(bookId)
        if (!book) throw new HttpError(404, "Book is not found!")

        const newLoan = loansModel.createLoan(user, book)
        res.status(201).json(newLoan)
    },

    //POST /admin/loans/:id/return
    return: (req, res) => {
        const { id } = req.params
        const loanReturned = loansModel.returnLoan(id)
        res.json(loanReturned)
    }

}