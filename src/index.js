const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.json());


app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${PORT}`)
})