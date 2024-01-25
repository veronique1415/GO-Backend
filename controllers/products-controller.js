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
        )
        .where({
          'producer.producer_id': req.params.producerId,
        });
        
      if (products.length < 1) {
        return res.status(404).json({
          message: `Producer with ID ${req.params.producerId} not found`,
        });
      }
      res.status(200).json(products);
    } catch (error) {
      console.error("Error retrieving products:", error);
      res.status(500).json({ message: "Unable to retrieve products for that producer." });
    }
  };

  module.exports = {
    getAll,
    findOne,
    producersProducts
  };