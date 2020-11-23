var express = require('express');
var app = express();

app.set('view engine', 'pug' );
app.use( express.static('public'));

app.get('/bloodbankhome', function(req, res){
    res.render('startPage')
});
app.get('/registerDonor', function(req, res){
    res.render('createDonor')
});

app.listen(3000);