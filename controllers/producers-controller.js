const knex = require('knex')(require("../knexfile"))
const express = require("express");
const router = express.Router();
const Joi = require("joi")



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
      return filteredProducers;
    } catch (error) {
      console.error('Error searching producers:', error);
      throw new Error('Internal Server Error - Unable to retrieve search information');
    }
  };

  const producerSchema = Joi.object({
    producer_name: Joi.string().required(),
    producer_region: Joi.string().required(),
    producer_village: Joi.string().required(),
    producer_image: Joi.string().required(),
    producer_description: Joi.string().required(),
    producer_description2: Joi.string().required(),
    producer_description3: Joi.string().required(),
  })

  const add = async (req, res) => {
    // if (!req.body.producer_name || !req.body.producer_region) {
    //   console.log(req.body.producer_name)
    //   return res.status(400).json({
    //     message: "Please provide name and region for the user in the request",
    //   });
    // }
    const {error} = producerSchema.validate(req.body)
    if(error) {
      return res.status(400).json({
        message: `Invalid request body: ${error.details[0].message}`
      })
    }

    const baseUrl = "https://grandordinaire-4b0d635ecbc0.herokuapp.com"
    const imagePath = baseUrl + '/images/' + req.file.filename;

    try {
      const result = await knex("producer").insert({
        ...req.body,
        producer_image: imagePath
      });
  
      const newProducerId = result[0];
      const createdProducer = await knex("producer").where({ producer_id: newProducerId }).first();
  
      res.status(201).json(createdProducer);
    } catch (error) {
      res.status(500).json({
        message: `Unable to create new user: ${error}`,
      });
    }
  };

  const producerSchemaWithId = producerSchema.keys({
    producer_id: Joi.number().required()
  })

  const updatedProducer = async (req, res) => {
    const {error} = producerSchemaWithId.validate(req.body)
    if(error) {
      return res.status(400).json({
        message: `Invalid request body: ${error.details[0].message}`
      })
    }
    try {
      const updatedProducer = await knex("producer")
        .where({ producer_id: req.params.producerId })
        .update(req.body);
  
      if (!updatedProducer) {
        return res.status(404).json({
          message: `Error: Inventory with item ID ${req.params.producerId} not found.`,
        });
      }
  
      const newlyUpdatedProducer = await knex("producer").where({
        producer_id: req.params.producerId,
      });
      res.status(200).json(newlyUpdatedProducer);
    } catch (error) {
      if (error.errno === 1452) {
        return res.status(400).json({
          message: `Error: Producer ID ${req.body.producer_id} not found.`,
        });
      } else {
        res.status(500).json({
          message: `Error updating database: ${error}`,
        });
      }
    }
  };
  
  const deleteProducer = async (req, res) => {
    try {
      const rowsDeleted = await knex("producer")
        .where({ producer_id: req.params.producerId })
        .delete();
  
      if (rowsDeleted === 0) {
        return res.status(404).json({
          message: `Producer with this ID ${req.params.producer_id} not found`,
        });
      }
  
      // No Content response
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({
        message: `Unable to delete producer: ${error}`,
      });
    }
  };

  
 
  

  


  module.exports = {
    getAll,
    findOne,
    searchProducers,
    add,
    updatedProducer, 
    deleteProducer
  };