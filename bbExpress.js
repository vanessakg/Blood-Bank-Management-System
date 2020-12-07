var express = require('express');
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");

app.set('view engine', 'pug' );
app.use( express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));

 var con = mysql.createConnection({
     host: "127.0.0.1",
     user: "csc4500",
     password: "gabby2020",
     database: "blood_bank",
     port: 3306
 });

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

app.post('/sendDonor', function(req, res){
   console.log(req.body);
   var sql = "INSERT INTO donor(donor_id, d_name, d_bloodType, d_age, d_phone, d_gender, d_email, d_address) VALUES ('"+req.body.dID+"', '"+req.body.dName+"', '"+req.body.dBlood+"', '"+req.body.dAge+"','"+req.body.dPhone+"','"+req.body.dGender+"','"+req.body.dEmail+"', '"+req.body.dAddress+"')";

    con.query(sql, function(err){
        if(err) throw err;
        console.log("Donor record inserted into blood_bank database.");
    });

    res.send("Thanks for registering! Here is the information you submitted: " + "\nDonor ID: " + req.body.dID +
            "Name: " + req.body.dName + "BloodType: " + req.body.dBlood + "Age: " + req.body.dAge + 
            "Phone No.: " + req.body.dPhone + "Gender: " + req.body.dGender + "Email: " + req.body.dEmail + "Address: " + req.body.dAddress);
});

app.post('/sendPatient', function(req, res){
    console.log(req.body);
    var sql = "INSERT INTO patient(id_patient, p_name, p_bloodType, p_age, p_phone, p_gender, p_email, p_address) VALUES ('"+req.body.pID+"', '"+req.body.pName+"','"+req.body.pBlood+"', '"+req.body.pAge+"', '"+req.body.pPhone+"', '"+req.body.pGender+"', '"+req.body.pEmail+"', '"+req.body.pAddress+"')";

    con.query(sql, function(err){
        if(err) throw err;
        console.log("Patient record inserted into blood_bank database.");
    });

    res.send("Thanks for registering with us! Here is the information you submitted: " + "\nDonor ID: " + req.body.pID +
             "Name: " + req.body.pName + "BloodType: " + req.body.pBlood + "Age: " + req.body.pAge + 
             "Phone No.: " + req.body.pPhone + "Gender: " + req.body.pGender + "Email: " + req.body.pEmail + "Address: " + req.body.pAddress);
});

app.listen(3333);