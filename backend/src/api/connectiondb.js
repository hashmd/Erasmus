require('dotenv').config(); // config busca .env del proyecto para tomar las variables y las mete en el entorno de Linux

const db = require('knex')({
    client: 'pg',
    connection: {
        host: "localhost",
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB
    }
});

module.exports = db;