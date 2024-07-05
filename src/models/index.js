#!/usr/bin/node

const {Sequelize} = require('sequelize');
const dotenv = require('dotenv');
dotenv.config()

/*
 create a sequelize instance 
 to connect to the database
  */
const sequelize = new Sequelize(process.env.DATABASE_URI, {
    dialect: 'postgres'
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);  
}