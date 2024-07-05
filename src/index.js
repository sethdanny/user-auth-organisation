const express = require('express');

const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT || 3001;
const app = express()

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
})