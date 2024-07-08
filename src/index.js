require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const organisationRoutes = require('./routes/orgRoutes.js');
const { sequelize, testConnection } = require('./models/index.js');
const cors = require('cors');


const PORT = process.env.PORT || 5001;
const app = express();

testConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/organisations', organisationRoutes);

app.use('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: 'Not found'
    })
})
app.get('/', (req, res) => {
    res.json({message: 'Hello Welcome to User Authentication API'})
})

    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });

module.exports = app;