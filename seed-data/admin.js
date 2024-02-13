const bcrypt = require('bcrypt');
const config = require("../config");


module.exports = [
    {
        id: 1,
        email: "veronique@hotmail.com",
        password: bcrypt.hashSync(config.adminPassword, 10)
    }
]