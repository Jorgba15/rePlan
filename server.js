const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const auth = require('./authentication/authorize.js')("admin",process.env.superUser || "password");

app.use(bodyParser.json());
app.use(express.static("./public"));

let db = require('./dbconnect.js');

/* Don't use this
app.get('/',auth, function (req, res) {
    let staticApp = readTextFile("public/lists.html");
    res.send(staticApp);
});

*/
// ENDPOINTS




// Listen to port --------------------------------
app.listen(process.env.PORT || 8080, function () {
    console.log('Listening');
});
