const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const auth = require('./authentication/authorize.js')("admin",process.env.superUser || "password");

app.use(bodyParser.json());
app.use(express.static("./public"));

let db = require('./dbconnect.js');


app.get('/',auth, function (req, res) {
    let staticApp = readTextFile("public/lists.html");
    res.send(staticApp);
});

app.listen(process.env.PORT || 8080, function () {
    console.log('Listening');
});

/* Database-ting --------------------------------------------------------------

app.use(function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});


app.post('/user', function(req, res) {

    res.send('Username: ' + req.body.username);
    res.send('password: ' + req.body.password);

};
*/
