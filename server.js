const express = require('express');
const app = express();
const cors = require("cors")
require("dotenv").config();
const port = process.env.PORT || 8080;


//setting up my middleware
app.use(cors())
app.use(express.json());
app.use(express.static("public"))

const productsRouter = require("./routes/products");
app.use("/products", productsRouter);

const producersRouter = require("./routes/producers");
app.use("/producers", producersRouter);


app.listen(port, () => {
    console.log(`server is running at port ${port} my friends`)
})