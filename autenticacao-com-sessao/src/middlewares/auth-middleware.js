
const authMiddleware = (req, res, next) => {
    if (req.session.authenticated) {
        next()
    } else {
        res.redirect("/")
    }
}

const ensureUserIsAdmin = (req, res, next) => {
    if (req.session.user.role !== "admin") {
        res.redirect("/dashboard")
    } else {
        next()
    }
}

module.exports = { authMiddleware, ensureUserIsAdmin }