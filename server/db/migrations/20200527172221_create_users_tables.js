
exports.up = function(knex) {
  return  knex.schema.createTable('users', function (table) {
    table.increments();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.integer('left_update');
    table.string('licence_key'); 
  });

};

exports.down = function(knex) {
    return knex.schema
    .dropTable('users');
};
