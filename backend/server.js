const express = require('express');
const cors = require('cors');
const router = require('./router.js')
const bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.json())
app.use('/', router)
app.use(express.urlencoded({extended: true}));
app.use(express.json()) 
app.use(cors())

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log("Server listening on port " + port + '!')
})