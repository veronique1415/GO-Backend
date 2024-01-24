const producersData = require("../seed-data/producers")
const productsData = require("../seed-data/products")


exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('producer').del();
  await knex('product').del();
  await knex('producer').insert(producersData);
  await knex('product').insert(productsData);   
};