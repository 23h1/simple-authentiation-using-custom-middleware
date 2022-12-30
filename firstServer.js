const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const { stringify } = require('querystring');
const app = express();
const PORT = 3000;

function customMiddleware(req, res, next){
    console.log("*******************************");
    console.log("INSIDE CUSTOM MIDDLEWARE");
    console.log("*******************************");
    next();
}

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(customMiddleware)

const inventory =   [{name:"cas", age:35, job:"dba"},
                    {name:"del", age:45, job:"swe"},
                    {name:"joe", age:33, job:"qa"},
                    {name:"sol", age:32, job:"PO"}];

app.get('/api/:inputName', function (req, res) {
    // console.log("Dynamic/Variable routing");
    // console.log(req.params);

    // const newBalance = req.params.balance - 100

    // res.send(JSON.stringify(newBalance));
    let matchedName;
    for (let i=0; i<inventory.length; i++){
        if(req.params.inputName === inventory[i].name){
            matchedName = inventory[i];
        }
    }

    res.send(JSON.stringify(matchedName));

});

function checkIfUserIsLoggedIn(req, res, next){
    console.log("YOU ARE CHECKING : User Authentication !");
    //console.log(req);
    if(req.body.user==="abe" || req.body.id === 27511){
        next();
    }
    else{
        res.send("YOU NEED TO BE LOGGED IN !");
    }

    //next();
}

app.get('/', checkIfUserIsLoggedIn, function (req, res) {
    //res.send('<h1>Welcome Home !</h1>');
    console.log("======******======");
    console.log("A U T H E N T I C A T E D     ! ! !");
    console.log(__dirname);
    console.log("======******======");
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'))
});

app.get('/firstpage', function (req, res) {
    //res.send('<h1>Welcome Home !</h1>');
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'))
});

app.get('/Careers', function (req, res) {
    res.send('Welcome to Careers page');
});

app.get('/about', function (req, res) {
    res.send('This is the About me page');
});



app.get("/api/:inputName", function (req, res) {
    console.log("Inside GET API");
    console.log(req.body);

    // res.send("Complit !");
    
    inventory.push(req.body);
    res.json(inventory);
});

app.post("/api/:inputName", function (req, res) {
    console.log("Inside POST API");
    console.log(req.body);

    // res.send("Complit !");
    
    inventory.push(req.body);
    res.json(inventory);
});

app.listen(3000, () => {
    console.log('Listening on Port: ' + PORT)
});