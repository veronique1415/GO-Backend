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


  const findOne = async (req, res) => {
    try {
      const singleProducer = await knex("producer").where({
        producer_id: req.params.producerId, 
      });
  
      if (singleProducer.length === 0) {
        return res.status(404).json({
          message: `Producer with ID ${req.params.producerId} not found`,
        });
      }
  
      const producerData = singleProducer[0];
      res.json(producerData);
    } catch (error) {
      res.status(500).json({
        message: `Unable to retrieve producer data for producer with ID ${req.params.producerId}`,
      });
    }
  };


  module.exports = {
    getAll,
    findOne
  };