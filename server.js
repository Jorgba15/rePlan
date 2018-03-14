const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const auth = require('./auth.js');

app.use(bodyParser.json());
app.use(express.static("./public"));

let db = require('./dbconnect.js');


// ENDPOINTS

app.use(function(req, res, next) {

    res.set('Access-Control-Allow-Origin', '*');
    res.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();

});
// Routing -----------------------------------

/* not implemented yet

    let users = require('./users.js');
    app.use('/users/', users);

    var list = require('./list.js');
    app.use('/list/', list);


    var tasks = require('./tasks.js');
    app.use('/tasks/', tasks);
*/

// Tell app to Listen to port --------------------------------
app.listen(process.env.PORT || 8080, function () {
    console.log('Listening');
});
