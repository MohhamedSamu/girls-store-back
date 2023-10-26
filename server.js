const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("HELLO WORLD")
})

const categoriesRouter = require("./router/categories.js")

app.use("/categories", categoriesRouter)

app.listen(3000)