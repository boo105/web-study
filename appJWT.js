var express = require("express");
var session = require("express-session");
const bodyParser = require('body-parser');
var loginRouter =require('./routes/login');
var app = express();

app.use(bodyParser.urlencoded({extended : false}));
app.use(session({
    secret : 'asdasdasdwqklj@dasd',
    resave : false,
    saveUninitalized : true
}));

app.use('/login',loginRouter);

app.listen(3000,function (){
    console.log("Connected 3000 port!!");
});
