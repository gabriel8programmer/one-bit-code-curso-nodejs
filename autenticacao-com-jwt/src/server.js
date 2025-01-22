
const express = require("express")
const authRouter = require("./routes/auth")
const protectedRouter = require("./routes/protected")

const app = express()

app.use(express.json())

app.use("/auth", authRouter)
app.use("/protected", protectedRouter)

app.listen(3000, () => "Server is running in http://localhost:3000/")