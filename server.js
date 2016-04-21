var http = require('http');
var port = process.env.port || 1337;
var debug = require('debug')('server.js');
var application_root = __dirname;
var express = require("express");
var mysql = require('mysql');
var path = require("path");
var app = express();
var connection = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : 'password',
    database: "gwtc_db"
});
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));

/*
connection.connect(function (err, rows) {
    if (err) console.log("Cannot connect to DB");
    else ("Using DB");
});*/

app.get('/api', function (req, res) {
    console.log("inside /api");
    res.send('Our Sample API is up...');
});

app.get('/getallpersons', function (req, res) {
    connection.connect(function (err) {
        if (err) {
            throw new Error("Can't connect to MySQL.");
        } else {
            connection.query("USE " + 'gwtc_db', function (err, rows, fields) {
                if (err) {
                    throw new Error("Missing database.");
                } 
                else {
                    console.log("Successfully selected database.");
                    connection.query('SELECT * FROM person;', function (error, rows, fields) {
                        if (err) throw err;
                        else res.send(JSON.parse(JSON.stringify(rows)));
                        console.log(JSON.stringify(rows));
                    });
                    //console.log("Successfully selected database.");
                }
            });
        }
    });
});

app.post('/save', function (req, res) {
    console.log("POST: ");
    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input);
    connection.connect(function (err) {
        if (err) {
            throw new Error("Can't connect to MySQL.");
        } else {
            connection.query("USE gwtc_db" , function (err, rows, fields) {
                if (err) {
                    throw new Error("Missing database.");
                } 
                else {
                    //input = connection.escape(input);
                    console.log(input);
                    //console.log(connection.escape(input.fname));
                    console.log("Successfully selected database.");
                    var query = "";
                    query += "INSERT INTO person (fname, lname, age, email, country, phone, date ) values (";
                    query += connection.escape(input.fname) + ", ";
                    query += connection.escape(input.lname) + ", ";
                    query += connection.escape(input.age) + ", ";
                    query += connection.escape(input.email) + ", ";
                    query += connection.escape(input.country) + ", ";
                    query += connection.escape(input.phone) + ", ";
                    query += connection.escape(input.date) + ", ";
                    query += ")";
                    console.log(query);
                    connection.query(query, function (error, rows, fields) {
                        if (err) throw err;
                        console.log("Inserted Successfully");
                    });
                    connection.end();
                }
            });
        }
    });
});

app.get('/', function (req, res) {
    res.sendfile('/public/index.html');
});

app.listen(port);
debug("App listening on: http://127.0.0.1:" + port);