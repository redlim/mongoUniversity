var express = require("express");
var app = express();
var engines = require('consolidate');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

app.engine('html',engines.nunjucks);
app.set('view engine','html');
app.set('views', __dirname + '/views');

MongoClient.connect('mongodb://localhost:27017/video',function (err,db) {
    assert.equal(null,err);
    console.log("yeah");

    app.get('/',function (req,res) {
        db.collection('movies').find({}).toArray(function (err,docs) {
            res.render('movies',{"movies":docs});
        })
    });

    app.use(function (req,res) {
        res.sendStatus(404);
    });
});



var server = app.listen(3000,function () {
   var port = server.address().port;
   console.log("listening in ", port)
});