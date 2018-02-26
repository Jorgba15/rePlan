const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static("./public"));



app.listen(process.env.PORT || 8080, function () {
    console.log('everything is good');
});
