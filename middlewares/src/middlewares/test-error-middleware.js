
module.exports = (err, req, res, next) => {
    if (err) {
        console.log(err.message)
        res.json({ message: err.message })
    } else {
        next()
    }
}