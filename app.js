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





app.listen(8080, function(){
    console.log("Server listening on port 8080");
});