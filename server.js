var express = require('express'),
    app = express();

var router = express.Router();

// console.info(__dirname);
    app.use(express.static(__dirname + '/dist'));
    app.get('/', function (req, res) {
        res.sendfile(__dirname + '/index.html');
    });

    app.listen(3001, function() {
        console.log("I'm Listening...")
    })