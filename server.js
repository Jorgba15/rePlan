const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const auth = require('./auth.js');

app.use(bodyParser.json());
app.use(express.static("./public"));

let db = require('./dbconnect.js');

/* Don't use this right now
app.get('/',auth, function (req, res) {
    let staticApp = readTextFile(".public/lists.html");
    res.send(staticApp);
});

*/
// ENDPOINTS

app.post("/user", function(req, res) {
    let staticApp = readTextFile("./lists.html");
    res.send(staticApp);
})


// Tell app to Listen to port --------------------------------
app.listen(process.env.PORT || 8080, function () {
    console.log('Listening');
});
