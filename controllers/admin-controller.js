const knex = require('knex')(require("../knexfile"));
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({
            message: "You are missing information for the admin in the request"
        });
    }

    try {
        const admin = await knex("admin")
            .where({ email: email })
            .first();

        if (!admin) {
            return res.status(400).json({
                message: "Invalid administrator"
            });
        }

        const isPasswordCorrect = bcrypt.compareSync(password, admin.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: admin.id,
                email: admin.email
            },
            process.env.JWT_KEY
        );

        res.status(200).json({ token: token, id: admin.id });
        console.log("token is ", token);
    } catch (error) {
        console.error("Error during admin login:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { loginAdmin };
