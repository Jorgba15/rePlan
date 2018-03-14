const express = require('express');
const router = express.Router();
const db = require('./dbconnect');

app.get('/', function (req,res){

    var sql = 'SELECT * FROM tasks';

    db.any(sql).then(function(data){

        res.status(200).json(data); //success - send the data as JSON!
                     }
    }).catch(function(err){

        res.status(500).json(err);

    });

});

app.post('/users/', bodyParser, function (req, res){

    res.set('Access-Control-Allow-Origin', '*');
    res.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");

    var upload = JSON.parse(req.body);

    var sql = `PREPARE insert_users (int, text, text,) AS INSERT INTO users VALUES(DEFAULT, $2); EXECUTE insert_users (0, '${upload.username}', '${upload.password}')`;

    let client = new Client({
            connectionString:process.env.DATABASE_URL || con,
            ssl:true
    });

    client.connect();

    client.query(sql, (err,resp) =>{

        res.json({msg: "insert ok"}).end();
        client.end();
    });

// export module
module.exports = router;
