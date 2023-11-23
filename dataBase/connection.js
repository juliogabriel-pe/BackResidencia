const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'seuHost',
    user: 'seuUser',
    password: 'suaSenha',
    database: 'seuBanco',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;