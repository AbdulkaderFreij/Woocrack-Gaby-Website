
exports.up = function(knex) {
    return  knex.schema.createTable('products_versions', function (table){
      table.increments();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.string('version').notNullable();
      table.string('download_path').notNullable();
      table.integer('product_id').unsigned().notNullable();
      table.foreign('product_id').references('id').inTable('products');  
    });
  };
  
  exports.down = function(knex) {
      return knex.schema
      .dropTable('products_versions');
  };
  