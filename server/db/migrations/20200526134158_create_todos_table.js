
exports.up = function(knex) {
    return knex.schema.createTable('todos', (table)=>{
      table.increments();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.string('title').notNullable();
      table.boolean('completed').notNullable().defaultTo(false);
    //   table.integer('user_id').references('id').inTable('users');
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('todos');
  };
  