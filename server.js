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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App is listening on PORT: ${PORT}`)
})