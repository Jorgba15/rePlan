const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {Client} = require("pg");

app.use(express.static("./public"));
app.use(bodyParser);

// database-string let dbString = "postgres://npqasiwaemucmm:e3957a2831921db77732a6677da46574476957600c649568b449a8442764f3e7@ec2-54-247-101-202.eu-west-1.compute.amazonaws.com:5432/d8m8khsgfiqpk9";

// Enpoints kommer her? 

app.listen(process.env.PORT || 8080, function () {
    console.log('Listening');
});
