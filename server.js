const express = require('express');
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8081;

app.use(express.json());






app.listen(port, () => {
    console.log(`server is running at port ${port} my friends`)
})