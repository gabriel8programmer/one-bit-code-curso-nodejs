require("dotenv").config()

const express = require("express")
const authRouter = require("./routes/auth")
const apiRouter = require("./routes/api")
const errorMiddleware = require("./middlewares/error-middleware")

const app = express()

app.use(express.json())

app.use(authRouter)
app.use(apiRouter)

app.use(errorMiddleware)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running in http://localhost:${PORT}`))