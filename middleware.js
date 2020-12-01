const http = require('http')
const express = require('express')
const app = express();

const server = http.createServer(app);
const port = 4455;

const sendHome = (req,res) => {
    res.send(`<h1>Some Content @ ${res.content}</h1>`)
    console.log(req.requestTime)
}

const timeLogger = (req,res, next)=>{
    let requestTime = new Date()
    res.content = requestTime
    req.requestTime = requestTime
    next()
}

const addOneToCount = (req,res, next) => {
    console.log(req.count)
    req.count = req.count ? req.count+1 : 1;
    next()
}

app.get('/', timeLogger, addOneToCount, sendHome)

server.listen(port, () => console.log(`Listening on port ${port}`))