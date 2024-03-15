const knex = require('knex')(require("../knexfile"))
const express = require("express");
const router = express.Router();
const Joi = require("joi")



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

  const findOne = async (req, res) => {
    try {
      const singleProduct = await knex("product").where({
        product_id: req.params.productId, 
      });
  
      if (singleProduct.length === 0) {
        return res.status(404).json({
          message: `Product with ID ${req.params.productId} not found`,
        });
      }
  
      const productData = singleProduct[0];
      res.json(productData);
    } catch (error) {
      res.status(500).json({
        message: `Unable to retrieve product data for bottle with ID ${req.params.productId}`,
      });
    }
  };
  const producersProducts = async (req, res) => {
    try {
      const products = await knex("product")
        .join("producer", "producer.producer_id", "product.producer_id")
        .select(
          "product.product_id",
          "product.product_name",
          "product.product_image",
          "producer.producer_image",
          "producer.producer_description",
          "producer.producer_description2",
          "producer.producer_description3",
          "producer.producer_village",
          "producer.producer_region"
        )
        .where({
          'producer.producer_id': req.params.producerId,
        });
        
      if (products.length < 1) {
        return res.status(404).json({
          message: `Producer with ID ${req.params.producerId} not found`,
        });
      }
      const filteredProducts = products.map(product => {
       
        return Object.fromEntries(
          Object.entries(product).filter(([key, value]) => value !== null)
        );
      });
  
      res.status(200).json(filteredProducts);
    } catch (error) {
      console.error("Error retrieving products:", error);
      res.status(500).json({ message: "Unable to retrieve products for that producer." });
    }
  };

  const searchProducts = async (req, res) => {
    try {
      const searchTerm = req.query.s ? req.query.s.toLowerCase() : '';
  
      const results = await search(knex, searchTerm);
  
      res.status(200).json(results);
    } catch (error) {
      console.error('Error searching products:', error);
      res.status(500).json({ message: 'Internal Server Error - Unable to retrieve search information' });
    }
  };
  
  const search = async (knex, searchQuery) => {
    try {
      if (!searchQuery) {
        throw new Error('Search query is undefined');
      }
  
      const filteredProducers = await knex('product')
        .where('product_name', 'LIKE', `%${searchQuery}%`)
        .orWhere('product_varietal', 'LIKE', `%${searchQuery}%`)
        .orWhere('product_producer', 'LIKE', `%${searchQuery}%`)
        .orWhere('product_region', 'LIKE', `%${searchQuery}%`)
        .orWhere('product_type', 'LIKE', `%${searchQuery}%`)
        .select('*');
      return filteredProducers;
    } catch (error) {
      console.error('Error searching products:', error);
      throw new Error('Internal Server Error - Unable to retrieve search information');
    }
  }; 

  const productSchema = Joi.object({
    product_name: Joi.string().required(),
    product_description: Joi.string().required(),
    product_region: Joi.string().required(),
    product_appellation: Joi.string().required(),
    product_image: Joi.string().required(),
    product_producer: Joi.string().required(),
    product_vintage: Joi.string().required(),
    product_varietal: Joi.string().required(),
    product_type: Joi.string().required(),
    producer_id: Joi.number().required()
  })

  const add = async (req, res) => {
    // if (!req.body.producer_name || !req.body.producer_region) {
    //   console.log(req.body.producer_name)
    //   return res.status(400).json({
    //     message: "Please provide name and region for the user in the request",
    //   });
    // }
    const {error} = productSchema.validate(req.body)
    if(error) {
      return res.status(400).json({
        message: `Invalid request body: ${error.details[0].message}`
      })
    }

    // const baseUrl = "https://grandordinaire-4b0d635ecbc0.herokuapp.com"
    // const imagePath = baseUrl + '/images/' + req.file.filename;

    try {
    //   const result = await knex("producer").insert({
    //     ...req.body,
    //     producer_image: imagePath
    //   });
  
      const newProductId = result[0];
      const createdProduct = await knex("product").where({ product_id: newProductId }).first();
  
      res.status(201).json(createdProduct);
    } catch (error) {
      res.status(500).json({
        message: `Unable to create new user: ${error}`,
      });
    }
  };
  

  

  module.exports = {
    getAll,
    findOne,
    producersProducts,
    searchProducts,
    add

  };