// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var handleb = require('express-handlebars');

//routes
var routes = require('./controller/burgers_controller.js');

//app instance
var app = express();

//set PORT to recognize local port and heroku port
var PORT = process.env.PORT || 8080;

//express to serve static files 
app.use(express.static(__dirname + '/public'));

//bodyparsers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));

// Override with POST having ?_method=DELETE or PUT
app.use(methodOverride('_method'));

//Use Handlebars for the default template
app.engine("handlebars", handleb({defaultLayout: "main"}));
app.set('view engine', 'handlebars');

//route / in browser to burgers_controller.js
app.use('/', routes);

//port is listening
app.listen(PORT, function() {
    console.log("App is listening on Port " + PORT);
});