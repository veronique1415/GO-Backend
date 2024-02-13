exports.up = function (knex) {
    return knex.schema
      .createTable("admin", (table) => {
        table.increments("id").primary();
        table.string("email").notNullable();
        table.string("password").notNullable();
      })
    }

exports.down = function (knex) {
    return knex.schema.dropTable("user");
    };    