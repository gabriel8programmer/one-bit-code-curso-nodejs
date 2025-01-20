const express = require("express")
const router = require("./router")

const app = express()

app.use(express.json())
app.use(router)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor Rodando na porta ${PORT}`)
})