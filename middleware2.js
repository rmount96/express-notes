const http = require('http')
const express = require('express')
const app = express();
const server = http.createServer(app)
const port = 4500

let api = {people:[], places:[], things:[]}



const sendHome = (req,res) => {
    res.send(`<h1>Some Content @ ${res.content}</h1>`)
    console.log(req.requestTime)
}

const getTime = (req,res, next) => {
    let requestTime = new Date()
    res.content = requestTime
    req.requestTime = requestTime
    next()
}

app.get('/', getTime, sendHome)

app.get('/api', (req,res, next) => {
    res.send(JSON.stringify(api))
})

server.listen(port, () => console.log(`Listening on port ${port}`))