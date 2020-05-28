
exports.up = function(knex) {
  return knex.schema.createTable('test_users', table => {
      table.increments('id').unsigned().primary();
      table.string('email').notNullable();
      table.string('password_digest').notNullable();
  }) 
};

exports.down = function(knex) {
  return knex.schema.dropTable('test_users');
};
