const express = require('express');
const app = express();
const cors = require('cors')

app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(cors())

app.get("/", (req, res) => {
  res.send("HELLO WORLD")
})

const categoriesRouter = require("./router/categories.js")
const deliveryRouter = require("./router/delivery.js")
const deliveryTeamRouter = require("./router/deliveryTeam.js")
const hashtagsRouter = require("./router/hashtags.js")
const paymentsRouter = require("./router/payments.js")
const postTemplatesRouter = require("./router/postTemplates.js")
const productsRouter = require("./router/products.js")
const publicationsDayRouter = require("./router/publicationDay.js")
const publicationsPostRouter = require("./router/publicationPost.js")

app.use("/categories", categoriesRouter)
app.use("/delivery", deliveryRouter)
app.use("/deliveryTeam", deliveryTeamRouter)
app.use("/hashtags", hashtagsRouter)
app.use("/payments", paymentsRouter)
app.use("/postTemplates", postTemplatesRouter)
app.use("/products", productsRouter)
app.use("/publicationDays", publicationsDayRouter)
app.use("/publicationPosts", publicationsPostRouter)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App is listening on PORT: ${PORT}`)
})