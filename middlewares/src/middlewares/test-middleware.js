
const m1 = (req, res, next) => {
    req.m1 = "OK!"
    next()
}

const m2 = (req, res, next) => {
    req.m2 = "OK!"
    next()
}

module.exports = { m1, m2 }