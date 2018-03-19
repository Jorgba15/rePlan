const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const jwt = require("jsonwebtoken");
// const bcrypt = require('bcrypt');

app.use(express.static('public'));
app.use(bodyParser.json());

let db = require('./dbconnect.js');

var secret = "supersecret";

// global stuff for all routes.....................

app.use(function(req, res, next) {
    // middleware access control
    res.set('Access-Control-Allow-Origin', '*');
    res.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.set( "Access- Control-Allow -Headers : *");
    next();

});

// Root, the server shows the index page.

var pgp = require('pg-promise')();

//db connect string
var con = process.env.DATABASE_URL || 'postgres://npqasiwaemucmm:e3957a2831921db77732a6677da46574476957600c649568b449a8442764f3e7@ec2-54-247-101-202.eu-west-1.compute.amazonaws.com:5432/d8m8khsgfiqpk9';


app.get('/', function(req, res) {
    let staticApp = readTextFile("public/index.html");
    res.send(staticApp);
});

// endpoint POST USER ------------------------------

app.post('/user', bodyParser, function (req, res) {

    let upload = JSON.parse(req.body);
    let encrPass = bcrypt.hashSync(upload.password, 10); // hash password

    let sql = `PREPARE insert_user (TEXT, TEXT) AS
        INSERT INTO users VALUES(DEFAULT, $2, $3); EXECUTE insert_user
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

// Edpoint login ---------------------------------------


app.post('/login/', bodyParser, function (req, res) {

   var upload = JSON.parse(req.body);

   var sql = `PREPARE get_user (text) AS
                   SELECT * FROM users WHERE username=$1;
                   EXECUTE get_user('${upload.username}')`;

   db.any(sql).then(function(data) {

       db.any("DEALLOCATE get_user");

       //if wrong user or password -> quit
       if (data.length <= 0) {
           res.status(403).json({msg: "user name does not exists"}); //send
           return; //quit
       } else {

           //check if the password is correct
           var psw = upload.password;
           var encPsw = data[0].password;
           var result = bcrypt.compareSync(psw, encPsw);

           if (!result) {
               res.status(403).json({msg: "Wrong password"}); //send
               return; //quit
           }
       }

       //we have a valid user -> create the token
       var payload = {loginname: data[0].loginname};
       var tok = jwt.sign(payload, secret, {expiresIn: "12h"});

       //send logininfo + token to the client
       res.status(200).json({loginname: data[0].loginname, token: tok});

       }).catch(function(err) {

           res.status(500).json({err, msg: "error in users.js"});

       });

// Tell app to Listen to port --------------------------------
app.listen(process.env.PORT || 8080, function () {
    console.log('Server started');
});
