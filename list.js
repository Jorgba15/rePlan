const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const db = require('./dbconnect');

//endpoint: GET lists
router.get('/list/', function (req,res){

    let sql = 'SELECT * FROM lists';
    db.any(sql).then(function(data){

        res.status(200).json(data); //success - send the data as JSON!
                     }
}).catch(function(err){

        res.status(500).json(err);

});

});

// export module
module.exports = router;
