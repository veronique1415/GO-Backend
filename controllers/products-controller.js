const knex = require('knex')(require("../knexfile"))
const express = require("express");
const router = express.Router();


const getAll = async (_req, res) => {
    try {
      const allProducts = await knex.select("*").from("product");
      res.status(200).json(allProducts);
    } catch (error) {
      res.status(500).json({
        message: `Unable to retrieve Products data`,
      });
    }
  };


  module.exports = {
    getAll,
  };