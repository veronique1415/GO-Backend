// import seed data files, arrays of objects
const adminData = require("../seed-data/admin");


exports.seed = async function(knex) {
  await knex('admin').del();
  await knex('admin').insert(adminData);
};