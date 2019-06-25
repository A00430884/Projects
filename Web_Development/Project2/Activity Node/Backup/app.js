var express = require("express");
var app = express();
var path = require("path");
var mongodb = require("mongodb");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}))

var database = "demo";
var host = "127.0.0.1";
var port ="27017"
var connectionString = "mongodb://" + host + ':' + port + '/' + database;

var catsCollection = []

mongodb.connect(connectionString, function (error, client){
	if (error){
		throw error;
	}
	console.log("DB RUNNING");

	var db = client.db('demo');
	catsCollection = db.collection('cats');



});

// ROUTES

app.listen(3000,"localhost",function() {
	console.log("Server is Running");
})

app.get("/",function(req,res) {
	res.render('index.html')
	// var name = "Allen"
	// res.render('index.ejs',{variable: name});
	// res.render('index.ejs');
	// res.sendFile(path.join(__dirname + '/hi.html'));
	// res.sendFile("C:/Users/allen/Desktop/MCDA 5550 - ClassActivity/Week 7/Activity 1 Node/hi.html")
	// res.send("<h1>Hello World!!!</h1>");
})

app.get("/cats",function(req,res) {

	catsCollection.find(function(err, result){
		if (err){
			throw err;
		}
		result.toArray( function (err, resultArray){
			if (err){
				throw err;
			}
			res.render( 'index.ejs', {resultArray:resultArray})
		})
	})
})

app.get("/cats/new",function(req,res) {
	res.render('new.ejs');
})

app.post("/create", function(req,res){
	
	var resultToBeSaved = {
		name: req.body.name,
		owner: req.body.owner
	}

	catsCollection.insert(resultToBeSaved, function(err,res){
		if (err){
			throw err;
		}
		console.log("SAVED");
		
	});

	res.redirect("/cats");

	// res.send("Posted");
})


app.get("/cats/:id", function(req,res){
	var o_id = new mongodb.ObjectID(req.params.id);
	catsCollection.find({"_id": o_id}, function (err, result){
		result.toArray(function (err, resultArray){
			console.log(resultArray)
			console.log(resultArray[0].name)
			console.log(resultArray[0].owner)
		})
	})
})

app.get("*",function(req,res) {
	res.send('Page Not Found');
})