const express = require('express')

// init express
const app = express();

// create your endpoints/route handlers
app.get('/', function(req,res) {
    res.send('Hello World!')
})

// listen on a port
app.listen(5000)