const {Sequelize} = require('sequelize');
const dotenv = require('dotenv');
dotenv.config()


const sequelize = new Sequelize(process.env.DATABASE_URI,{
    dialect: 'postgres',
    protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
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
