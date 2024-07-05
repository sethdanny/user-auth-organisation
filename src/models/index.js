const {Sequelize} = require('sequelize');
const config = require('../config/config.js');
const dotenv = require('dotenv');
dotenv.config()


const sequelize = new Sequelize(config.USER, config.PASSWORD,config.DB,{
    host: config.HOST,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
});
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);  
    }
}

module.exports = {sequelize, testConnection}
