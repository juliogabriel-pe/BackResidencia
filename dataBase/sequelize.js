const Sequelize = require('sequelize');

const sequelize = new Sequelize('mydb_8yjb', 'mydb_8yjb_user', 'XhUAK3u5RjDZrFO3bLoshixuPLgdSi3i', {
    host: 'dpg-clprc7hjvg7s73f3v2vg-a',
    port: 5432,
    dialect: 'postgres'
});

module.exports = sequelize;