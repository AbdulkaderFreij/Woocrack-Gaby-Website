exports.up = function(knex) {
    knex.schema.createTable('users', function (table) {
        table.increments();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.integer('left_update');
        table.string('licence_key'); 
      });

      knex.schema.createTable('packages', function (table){
        table.increments();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.integer('updates').notNullable();
        table.integer('interval').notNullable();
        table.integer('video').notNullable();

      });

      knex.schema.createTable('packages_users', (table)=>{
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
            .dropTable('packages_users')
            .dropTable('users')
            .dropTable('packages');
    };