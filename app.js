var express = require("express");
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var assert = require('assert');

var MongoClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectID;
var url = 'mongodb://localhost:27017/courses';
var mDb;

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  mDb = db;
});

var app = express();
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));
app.set('views', 'public');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  mDb.collection('course').mapReduce(
    function() { emit(null, this.grade) },
    function(id, values) { return Array.sum(values)/values.length },
    { out: {inline: 1} }
  ).then(function(results) {
    res.render('index', {average: (results[0] ? results[0].value : 'N/A')});
  });
});

app.get('/list', function(req, res) {
  mDb.collection('course').find({}).toArray((err, courses) => {
    res.render('list', {courses: courses});
  });
});

app.post('/', function(req, res) {
  mDb.collection('course').insert(req.body, function(err) {
    if (err === null) {
      res.status(200).end();
    } else {
      res.status(500).end();
    }
  });
});

app.delete('/', function(req, res) {
  mDb.collection('course').deleteOne({
    _id: ObjectId(req.body.id),
  }, function(err) {
    if (err === null) {
      res.status(200).end();
    } else {
      res.status(500).end();
    }
  });
});

app.listen(3000);

console.log("Running at Port 3000");