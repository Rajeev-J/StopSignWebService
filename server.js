var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Sign = require('./api/models/geoStorageModel')
bodyParser = require('body-parser');


// mongoose instance connection url connection
mongoose.Promise = global.Promise;

const env = require('./env/environment');

mongoose.connect("mongodb://localhost:27017/geo-database", {
    useMongoClient: true
}).then(function() {
    console.log('success connect to mongodb');
}, function(err) {
    console.log('failed to connect to mongodb');
});

app.use(bodyParser.urlencoded({
    extended: true
}));

//set up static files
app.use(express.static('./api/public'));
console.log(__dirname + '/node_modules/');
app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use(bodyParser.json());


var routes = require('./api/routes/geoStorageRoutes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
    res.status(404).send({
        url: req.originalUrl + ' not found'
    })
});

app.listen(port);


console.log('BMW Sign Service started on port: ' + port);