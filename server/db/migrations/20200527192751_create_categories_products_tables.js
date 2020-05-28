
exports.up = function(knex) {
    return  knex.schema.createTable('categories_products', function (table){
      table.increments();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.integer('product_id').unsigned().notNullable();
      table.integer('category_id').unsigned().notNullable();
      table.foreign('product_id').references('id').inTable('products');
      table.foreign('category_id').references('id').inTable('categories');


  
    });
  };
  
  exports.down = function(knex) {
      return knex.schema
      .dropTable('categories_products');
  };
  