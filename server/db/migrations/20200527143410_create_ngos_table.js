
exports.up = function(knex) {
    return knex.schema.createTable('ngos', (table)=>{
        table.increments();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.string('name').notNullable();
        table.string('ngo_name').notNullable();
        table.string('email').notNullable();
        table.integer('phone');
        table.string('certified_image');    

      })
    };
    
    exports.down = function(knex) {
        return knex.schema.dropTable('ngos');
    };