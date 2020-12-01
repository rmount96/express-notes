const http = require('http')
const express = require('express')
const app = express();
const server = http.createServer(app)
const port = 4400
const people = require('./data.json');
const { response } = require('express');


app.get('/', (req,res) => {
    res.send('<h1>You are Home</h1>')
})

//can filter between male/female
app.get('/api/people/gender/:gender', (req,res) => {
    const {gender} = req.params;
    let results = people.filter(person=>person.gender == gender)
    res.send(results)
})

//will find a person with a specific email
app.get('/api/people/email/:email', (req,res) => {
    const {email} = req.params;
    let results = people.filter(person=>person.email == email)
    res.send(results)
})

//will pull all data in email key
app.get('/api/people/email', (req,res) => {
    res.send(people.map(person => person.email))
})

//this will pull all data with a specific key
app.get("/api/people/:search", (req,res) => {
    const {search} = req.params;
    let results = people.filter(person => {
        return JSON.stringify(person).includes(search)
    })
    res.send(results)
})

const checkID = (req,res, next) => {
    const {id} = req.params;
    if(id.length <= 4) {
        return res.send("ID needs to be at least 5 characters long.")
    }
    next()
}

app.get("/api/:id", checkID, (req,res) => {
    res.send(`Your ID is ${req.params.id}`)
})


server.listen(port, () => console.log(`Server is listening on port ${port}`))