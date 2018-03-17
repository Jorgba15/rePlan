const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const db = require('./dbconnect');

app.post('/user/', bodyParser, function (req, res){

    res.set('Access-Control-Allow-Origin', '*');
    res.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");

    let upload = JSON.parse(req.body);

    let sql = `PREPARE insert_users (int, text, text,) AS INSERT INTO users VALUES(DEFAULT, $2); EXECUTE insert_users (0, '${upload.username}', '${upload.password}')`;

    let client = new Client({
            connectionString:process.env.DATABASE_URL || db, // connection string? 
            ssl:true
    });

    client.connect();

    client.query(sql, (err,resp) =>{

        res.json({msg: "insert ok"}).end();
        client.end();
    });

// export module
module.exports = router;
