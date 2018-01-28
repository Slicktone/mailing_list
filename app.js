var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var faker = require("faker");
var mysql = require("mysql");
var ejs = require("ejs");

// CONFIG
// templating engine setup for EJS
app.set("view engine", "ejs");
// body parsing
app.use(bodyParser.urlencoded({extended: true}));


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'slicktone',
    database: 'mailing_list'
    // password: process.env.MYSQL_PW
});



app.get("/", function(req, res) {
    // Find the count of users in the Databases
    var q = "SELECT COUNT(*) AS count FROM users";
    connection.query(q, function(error, results){
        if(error) throw error
            var count = (results[0].count);
        //   res.send("We have " + count + " users in our database");
        // render the views directory to see the EJS template
        // Or basically Look for Views Directory -> then Look for home.ejs file
            res.render("home", {count: count});
    });
});


app.post("/register", function(req, res) {
// creating the person variable for body
    var person = {
            email: req.body.email
    };
// Some TESTING for the register route and storing of emails with req.body
    // var email = req.body.email;
    // console.log("POST REQUEST SET TO /REGISTER and the Email is " + req.body.email);

    // dynamically inserting the data with mySQL and redirecting back home
    connection.query('INSERT INTO users SET ?', person, function(err, result) {
        if (err) throw err;
        console.log(result);
        // Take me back home once data is inserted
        res.redirect("/");
    });
});



app.listen(8080, function(){
    console.log("Server listening on port 8080");
});