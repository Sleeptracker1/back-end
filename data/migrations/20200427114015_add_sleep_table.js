
exports.up = function(knex, Promise) {
  return knex.schema
        .createTable('sleep_details', (tbl) => {
          tbl.increments('id')
          tbl.string('score', 255).notNullable()
          tbl.string('start_time', 255).notNullable()
          tbl.string('end_time', 255).notNullable()
          tbl.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
          tbl.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
          tbl.string('notes', 255)

          //foreign key
          tbl.integer('users_id')
              .references('id')
              .inTable('users')
              .notNullable()
              .unsigned()
              .onUpdate("CASCADE")
              .onDelete("RESTRICT")
        })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('sleep_details')
};
