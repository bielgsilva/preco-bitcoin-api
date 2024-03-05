const knex = require('knex')({
    client: 'pg',
    connection: process.env.DB_URI,
})

module.exports = knex