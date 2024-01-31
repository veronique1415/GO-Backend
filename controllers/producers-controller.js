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



  const searchProducers = async (req, res) => {
    try {
      const searchTerm = req.query.s ? req.query.s.toLowerCase() : '';
  
      const results = await search(knex, searchTerm);
  
      res.status(200).json(results);
    } catch (error) {
      console.error('Error searching producers:', error);
      res.status(500).json({ message: 'Internal Server Error - Unable to retrieve search information' });
    }
  };
  
  const search = async (knex, searchQuery) => {
    try {
      if (!searchQuery) {
        throw new Error('Search query is undefined');
      }
  
      const filteredProducers = await knex('producer')
        .where('producer_name', 'LIKE', `%${searchQuery}%`)
        .orWhere('producer_region', 'LIKE', `%${searchQuery}%`)
        .orWhere('producer_village', 'LIKE', `%${searchQuery}%`)
        .select('*');
      console.log(filteredProducers.toString())
      return filteredProducers;
    } catch (error) {
      console.error('Error searching producers:', error);
      throw new Error('Internal Server Error - Unable to retrieve search information');
    }
  };
  
 
  

  


  module.exports = {
    getAll,
    findOne,
    searchProducers
  };