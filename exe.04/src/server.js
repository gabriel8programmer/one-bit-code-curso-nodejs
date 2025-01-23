
const express = require("express")
const authRouter = require("./routes/auth")
const adminRouter = require("./routes/admin")
const dashboardRouter = require("./routes/dashboard")
const app = express()

app.use(express.json())

app.use("/auth", authRouter)
app.use("/dashboard", dashboardRouter)
app.use("/admin", adminRouter)

const PORT = 3000
app.listen(PORT, () => console.log(`Server running in: http://localhost:${PORT}`))