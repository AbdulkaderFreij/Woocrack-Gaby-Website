
exports.up = function(knex) {
    return  knex.schema.createTable('categories', function (table){
      table.increments();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.string('name').notNullable();
  
    });
  };
  
  exports.down = function(knex) {
      return knex.schema
      .dropTable('categories');
  };
  