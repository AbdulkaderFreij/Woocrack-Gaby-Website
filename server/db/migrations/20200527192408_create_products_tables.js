
exports.up = function(knex) {
    return  knex.schema.createTable('products', function (table){
      table.increments();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.string('type').notNullable();
      table.string("link").notNullable();
   
  
    });
  };
  
  exports.down = function(knex) {
      return knex.schema
      .dropTable('products');
  };
  