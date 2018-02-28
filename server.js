const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {Client} = require("pg");

app.use(express.static("./public"));


app.listen(process.env.PORT || 8080, function () {
    console.log('Listening');
});
