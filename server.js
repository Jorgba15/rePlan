const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// const auth = require('./auth.js');

app.use(bodyParser.json());

app.get('/', function(req, res) {
  let staticApp = readTextFile("public/index.html");
  res.send(staticApp);
});


let db = require('./dbconnect.js');

app.use(function(req, res, next) {

    res.set('Access-Control-Allow-Origin', '*');
    res.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.set( " Access- Control-Allow -Headers : *");
    next();

});

// Routing -----------------------------------
/*
let users = require('./users.js');
app.use('/users/', users);

let list = require('./list.js');
app.use('/list/', list);


let tasks = require('./tasks.js');
app.use('/tasks/', tasks);
*/

// Tell app to Listen to port --------------------------------
app.listen(process.env.PORT || 8080, function () {
    console.log('Listening');
});
