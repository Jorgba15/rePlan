const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
// const bcrypt = require('bcrypt');

app.use(express.static('public'));
app.use(bodyParser.json());

let db = require('./dbconnect.js');

let secret = "superdupersecret";

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
        INSERT INTO users VALUES(DEFAULT, $2, $3); EXECUTE insert_user
        (0, '${upload.username}', ${encrPass}')`;

db.any(sql).then(function(data) {

    //db.any("DEALLOCATE insert_user");

    //create the token
    let payload = {username: upload.username};
    let tok = jwt.sign(payload, secret, {expiresIn: "12h"});

    //send logininfo + token to the client
    res.status(200).json({username: upload.username, token: tok});

    }).catch(function(err) {

    console.log("user error");
    res.status(500).json({err});

    });

});

// Endpoint login --------------------------------------- Wanted to try this, but the app crashed.
/*
app.post('/login/', bodyParser, function (req, res) {

   let upload = JSON.parse(req.body);

   let sql = `PREPARE get_user (text) AS
                   SELECT * FROM users WHERE username=$1;
                   EXECUTE get_user('${upload.username}')`;

   db.any(sql).then(function(data) {

       db.any("DEALLOCATE get_user");

       //if wrong user or password -> quit
       if (data.length <= 0) {
           res.status(403).json({msg: "user name does not exists"}); //send //403, forbidden
           return; //quit
       } else {

           //check if the password is correct
           let psw = upload.password;
           let encPsw = data[0].password;
           let result = bcrypt.compareSync(psw, encPsw);

           if (!result) {
               res.status(403).json({msg: "Wrong password"}); //send
               return; //quit
           }
       }

       //we have a valid user -> create the token
       let payload = {loginname: data[0].loginname};
       let tok = jwt.sign(payload, secret, {expiresIn: "12h"});

       //send logininfo + token to the client
       res.status(200).json({loginname: data[0].loginname, token: tok});

       }).catch(function(err) {

           res.status(500).json({err, msg: "error in users"});

       });
*/

// Tell app to Listen to port --------------------------------
app.listen(process.env.PORT || 8080, function () {
    console.log('Server started');
});
