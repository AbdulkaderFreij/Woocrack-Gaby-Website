
exports.up = function(knex) {
  return  knex.schema.createTable('packages', function (table){
    table.increments();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.integer('updates').notNullable();
    table.integer('interval').notNullable();
    table.integer('video').notNullable();

  });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('packages');
};
