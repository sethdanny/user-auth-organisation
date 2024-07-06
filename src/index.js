const express = require('express');
const dotenv = require('dotenv');
const authRoute = require('./routes/authRoutes.js');
const { sequelize, testConnection } = require('./models/index');
const cors = require('cors');

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

testConnection();

app.use(express.json());
app.use(cors());

app.use('/api/v1', authRoute);

app.use('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: 'Not found'
    })
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})