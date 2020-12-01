const http = require('http')
const express = require('express')
const app = express();

const server = http.createServer(app);
const port = 4540;

const setMagicId = (req,res, next)=>{
    req.magicId = Math.random()
    console.log(req.magicId)
    next()
}

app.use(setMagicId)

app.get("/", (req,res)=>{
    res.send(`
        You are at root and your magicId is:
        ${req.magicId}
    `)
});

app.get("/api", (req,res)=>{
    console.log(`
        You are at api but you have a magic id of : ${req.magicId}
    `)
})


server.listen(port, () => console.log(`Listening on port ${port}`))