const express = require("express")
const { m1, m2 } = require("./middlewares/test-middleware")
const testErrorMiddleware = require("./middlewares/test-error-middleware")
const uploadMiddleware = require("./middlewares/upload-middleware")
const app = express()

app.use(express.static("public"))

app.use(m1)

app.get("/teste1", (req, res) => {
    console.log({ m1: req.m1, m2: req.m2 })
    res.end()
})

app.get("/teste2", m2, (req, res) => {
    console.log({ m1: req.m1, m2: req.m2 })
    res.end()
})

app.post("/upload", uploadMiddleware.single("image"), (req, res) => {
    console.log({ m1: req.m1, m2: req.m2 })
    console.log(req.file, req.body)
    res.end()
})

app.use(testErrorMiddleware)

const PORT = 3000
app.listen(PORT, () => console.log("Servidor rodando!"))