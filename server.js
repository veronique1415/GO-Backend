const express = require('express');
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8081;


//setting up my middleware
app.use(cors())
app.use(express.json());
app.use(express.static("public"))






app.listen(port, () => {
    console.log(`server is running at port ${port} my friends`)
})