const SERVER_PORT = 8141;
var express = require('express');

//CORS Middleware, causes Express to allow Cross-Origin Requests
// Do NOT change anything here
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
};


//set up the server variables
var app = express();
app.use(express.bodyParser());
app.use(allowCrossDomain);
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/css', express.static(__dirname + '/css'));
app.use(express.static(__dirname));

//mongo db connection

var mongodb = require('mongodb').MongoClient;
//NAME_OF_COLLECTION = 'rectangles';
//const SERVER_PORT = 9898;
var user = 'a_mathew';
var password = 'A00432526';
var database = 'a_mathew';

//These should not change, unless the server spec changes
var host = '127.0.0.1';
var port = '27017'; // Default MongoDB port


// Now create a connection String to be used for the mongo access
var connectionString = 'mongodb://' + user + ':' + password + '@' +
        host + ':' + port + '/' + database;

console.log(connectionString);

//#############################################
//the var for the rectangle collections
var universityCollection;
const NAME_OF_COLLECTION = 'UniversityDatabase';
//#############################################

//now connect to the db
mongodb.connect(connectionString, {useNewUrlParser: true}, function (error, db) {

    if (error) {
        throw error;
    }//end if

    universityCollection = db.collection(NAME_OF_COLLECTION);

    // Close the database connection and server when the application ends
    process.on('SIGTERM', function () {
        console.log("Shutting server down.");
        db.close();
        app.close();
    });

    //now start the application server
    var server = app.listen(SERVER_PORT, function () {
        console.log('Listening on port %d',
                server.address().port);
    });
});


// //now start the application server
// var server = app.listen(SERVER_PORT, function () {
//         console.log('Listening on port %d',
//                 server.address().port);
// });

// Adding Universitig
app.post('/saveUniversity', function (request, response) {

    console.log("Process being executed in " + __dirname);

    //extract the data
    
    var name = parseFloat(request.body.Name);
    var address = parseFloat(request.body.Address);
    var phone = parseFloat(request.body.PhoneNumber);

    console.log('University: ' + name + " + " + address+ " + " + phone);

    var cnt = universityCollection.count({'Name': request.body.Name}, function (err, result) {

        if (err) {
            return response.send(200, error)
        }
        console.log('Count: %d', result);

        if (result == 0) {
            universityCollection.insert(request.body,
                    function (err, reslt) {
                        if (err) {
                            return response.send(400, 'An error occurred saving a record.');
                        }//end if

                        return response.send(200, "Record inserted successfully.");
                    });
        } else {
            return response.send(200, "Record Exists.");
        }

    });
});