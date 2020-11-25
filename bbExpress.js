var express = require('express');
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");

app.set('view engine', 'pug' );
app.use( express.static('public'));

var con = mysql.createConnection({
    host: "localhost",
    user: "csc4500",
    password: "gabby2020",
    database: "blood_bank",
    port: 3306
})

con.connect(function(err){
    if(err) throw err;
    console.log("Connected!");
});

app.get('/bloodbankhome', function(req, res){
    res.render('startPage')
});
app.get('/registerDonor', function(req, res){
    res.render('createDonor')
});
app.get('/registerPatient', function(req, res){
    res.render('createPatient')
});

app.post('/sendmyProfile', function(req, res){
   console.log(req.body);
   var sql = `INSERT INTO donor(donor_id, d_name, d_bloodType, d_age, d_phone, d_gender, d_email, d_address) 
              VALUES ('"+req.body.donor_id+"', '"+req.body.d_name+"', '"+req.body.d_bloodType, '"+req.body.d_age+"','"+req.body.d_phone+"','"+req.body.d_gender+"','"+req.body.d_email+"', '"+req.body.d_address+"'`;

    con.query(sql, function(err){
        if(err) throw err;
        console.log("Record Inserted to database.");
    });
    res.send("Your information has been submitted.");
});

app.listen(3333);