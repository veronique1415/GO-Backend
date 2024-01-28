exports.up = function (knex) {
    return knex.schema
      .createTable("producer", (table) => {
        table.increments("producer_id").primary();
        table.string("producer_name").notNullable();
        table.string("producer_region").notNullable();
        table.string("producer_village").notNullable();
        table.string("producer_image").notNullable();
        table.string("producer_description", 1000).notNullable();
        table.string("producer_description2",1000).nullable();
        table.string("producer_description3", 1000).nullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table
          .timestamp("updated_at")
          .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
      })
      .createTable("product", (table) => {
        table.increments("product_id").primary();
        table.string("product_name").notNullable();
        table.string("product_description").notNullable();
        table.string("product_region").notNullable();
        table.string("product_appellation").nullable();
        table.string("product_image").notNullable();
        table.string("product_varietal").notNullable();
        table.string("product_producer").notNullable();
        table.string("product_vintage").notNullable();
        table
          .integer("producer_id")
          .unsigned()
          .references("producer.producer_id")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table
          .timestamp("updated_at")
          .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
      });
  };
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("product").dropTable("producer");
  };
