const http = require('http')
const fs = require('fs')
const express = require('express')

const app = express();
const home = ['/', '/home']

const sendFavicon = (req,res)=>{
    fs.readFile("/favicon.ico",(err,data)=>{
        if(err) return res.send(err);
        res.send(data)
    } )
}

const makeHeading = (page) => {
    let heading
    switch(page){
        case "about":
            heading = `<h1>This is about!</h1>`;
            break;
        case "contact":
            heading = `<h1>This is contact</h1>`;
            break;
        case "home":
            heading = "<h1>I Pitty THE foo</h1>"
            break;
        default:
            heading = `<h1>This is Home</h1>`;
    }
    return heading
}

const _404Content = `
<!DOCTYPE html>
<html> 
    <head> 
        <title>An Error you have found</title>
    </head>
    <body>
        <h1>404</h1>
        <blockquote>"An Error you have found" - Yoda
        </blockquote>
    </body>
</html>
`;

const generateContent = (title) =>`
<!DOCTYPE html>
<html> 
    <head> 
        <title>${title}</title>
    </head>
    <body>
        <h1>${title}</h1>
    </body>
</html>
`;

const send404  = (req,res) => {
    res.status(404);
    res.send(_404Content)
}

const serveHome = (req,res) => {
    res.send(generateContent('Home'))
}

//favicon route
app.get("/favicon.ico", sendFavicon)

app.get(home, serveHome)

app.get("/about", (req,res) => res.send(generateContent("About")))

app.get('/contact', (req,res) => res.send(generateContent("Contact")))

app.get('*', send404)

const server = http.createServer(app)

const port = 4432
server.listen(port, () => console.log(`listening on port ${port}`))