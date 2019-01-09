const express = require('express');

var app = express();

app.use(express.static(__dirname + '/HTML'));

app.listen(3000, () => {
    console.log('server is up and running at port 3000');
})