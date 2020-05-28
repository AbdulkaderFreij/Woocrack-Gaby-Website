
exports.up = function(knex) {
    return knex.schema.createTable('videos_tracking', (table)=>{
        table.increments();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.string('email').notNullable();
        table.integer('count'); 

      })
    };
    
    exports.down = function(knex) {
        return knex.schema.dropTable('videos_tracking');
    };