const knex = require('knex')(require("../knexfile"))
const express = require("express");
const router = express.Router();


const getAll = async (_req, res) => {
    try {
      const allProducers = await knex.select("*").from("producer");
      res.status(200).json(allProducers);
    } catch (error) {
      res.status(500).json({
        message: `Unable to retrieve Producer data`,
      });
    }
  };


  module.exports = {
    getAll,
  };