const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const organisationRoutes = require('./routes/orgRoutes.js');
const { sequelize, testConnection } = require('./models/index.js');
const cors = require('cors');

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

testConnection();

app.use(express.json());
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

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}

module.exports = app;