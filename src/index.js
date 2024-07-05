const express = require('express');
const dotenv = require('dotenv');
const { sequelize, testConnection } = require('./models/index');

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

testConnection();

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})