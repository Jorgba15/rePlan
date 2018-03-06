const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('port', (process.env.PORT || 8080));

const auth = require('./authentication/authorize.js')("admin",process.env.superUser || "password");

app.use(bodyParser.json());
app.use(express.static("./public"));


app.get('/',auth, function (req, res) {
    let staticApp = readTextFile("public/lists.html");
    res.send(staticApp);
});

app.listen(process.env.PORT || 8080, function () {
    console.log('Listening');
});

/* Something like this. 

app.post('/', function(req, res) {

    res.send('Username: ' + req.body.username);

};

*/
