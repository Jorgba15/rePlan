const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

app.use(express.static('public'));
app.use(bodyParser.json());

let db = require('./dbconnect.js');

// global stuff for all routes.....................

app.use(function(req, res, next) {
    // middleware access control
    res.set('Access-Control-Allow-Origin', '*');
    res.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.set( "Access- Control-Allow -Headers : *");
    next();

});

// Root, the server shows the index page.

app.get('/', function(req, res) {
    let staticApp = readTextFile("public/index.html");
    res.send(staticApp);
});

// endpoint POST USER ------------------------------

app.post('/user', bodyParser, function (req, res) {

    let upload = JSON.parse(req.body);
    let encrPass = bcrypt.hashSync(upload.password, 10); // hash password

    let sql = `PREPARE insert_user (TEXT, TEXT) AS
        INSERT INTO users VALUES(DEFAULT, $2); EXECUTE insert_user
        (0, '${upload.username}', ${encrPass}')`;

db.any(sql).then(function(data) {

    //db.any("DEALLOCATE insert_user");

    //create the token
    var payload = {username: upload.username};
    var tok = jwt.sign(payload, secret, {expiresIn: "12h"});

    //send logininfo + token to the client
    res.status(200).json({username: upload.username, token: tok});

    }).catch(function(err) {

    console.log("user error");
    res.status(500).json({err});

    });

});

// Tell app to Listen to port --------------------------------
app.listen(process.env.PORT || 8080, function () {
    console.log('Server started');
});
