var burger = require('../models/burger.js');
var express = require('express');
var router = express.Router();

//app routes
//redirects / to /index
router.get('/', function(req, res) {
    res.redirect('/index');
});

//gets all the burgers and forms the index file by passing in the burger objects for handlebars to use
router.get('/index', function(req, res) {
    burger.selectAll(function(data) {
        var hndlObj = {
            burgers: data
        };
        console.log(hndlObj);
        res.render('index', hndlObj);
    });
});

//route that posts a new, user-entered burger name then uses a callback to redirect to /index 
router.post('/burgers/insertOne', function(req, res) {
    burger.insertOne(
        ['burger_name', 'devoured'],
        [req.body.name, false],
        function() {
            res.redirect('/index');
        });

});

//route that updates the burger status from uneaten to eaten, then does a callback that redirects to /index
router.put('/burgers/updateOne/:id', function(req, res)     {
    var condition = 'id = ' + req.params.id;
    console.log('condition', condition);

    burger.updateOne({devoured: req.body.devoured}, condition, function() {
        res.redirect('/index');
        });
});

//exporting file
module.exports = router;
