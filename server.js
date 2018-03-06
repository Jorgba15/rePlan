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

/*

app.get("/que", function (req, res) {
    res.json(que).end();
});

app.delete("/que/:name/",auth, function (req, res) {
    let name = req.params.name;

    console.log("Delete " + name);

    if (name) {
        name = name.toLowerCase();
        let index = que.findIndex(item => {
            return item.name === name;
        });

        if (index >= 0) {
            complete.push(name);
            que.splice(index, 1);
        }

        res.json(que);
    }

});

app.post('/que/',  function (req, res) {

    let name = req.body.name;
    let info = req.body.info;

    if (name) {
        name = name.toLowerCase();
        let index = que.findIndex(item => {
            return item.name === name;
        })

        if (index == -1) {
            que.push({name:name, info:info});
        }

    }

    res.json(que);
}); */
