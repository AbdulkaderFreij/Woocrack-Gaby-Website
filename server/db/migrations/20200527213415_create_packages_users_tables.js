
exports.up = function(knex) {
  

    return      knex.schema.createTable('packages_users', (table)=>{
        table.increments();
        table.timestamp('start_date').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.boolean('active');
        table.integer('package_id').unsigned().notNullable();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('package_id').references('id').inTable('packages');
        table.foreign('user_id').references('id').inTable('users');
      });
    };
    
    exports.down = function(knex) {
        return knex.schema
        .dropTable('packages_users');
    };
    