var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//1. get method retrieves the data
app.get('/contactlist',function(req,res){
	console.log("I rec'd a get request");
	
	//get data from mongo db table/collection "contactlist"
	db.contactlist.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});

});//end of app.get

//2. post method inserts data into mongodb
app.post('/contactlist',function(req,res){
	console.log(req.body);
	db.contactlist.insert(req.body,function(err,doc){
		res.json(doc);	
	});
});

//3. Delete method deletes the data from mongodb
app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    	res.json(doc);
  });
});

//4. Edits the id of the data (the contactlist) or a specific row of the table/collection
app.get('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

//5. Put the edited data back in the database
app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.contactlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});


app.listen(3000);
console.log("Server running on port 3000");