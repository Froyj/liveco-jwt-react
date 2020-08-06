require('dotenv').config()

const express = require('express');
const port = process.env.PORT;
const app = express();
const api = require('./routes')
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api', api)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})