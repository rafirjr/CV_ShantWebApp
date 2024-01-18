// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

enum _USER_ROLES {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.string('email').unique().notNullable()
    table.string('password')
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.string('phone_number')
    table.enu('role', Object.keys(_USER_ROLES), { useNative: true, enumName: 'user_role' }).notNullable()
    table.boolean('is_verified').notNullable()

    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
  return knex.schema.raw('drop type IF EXISTS user_role')
}
