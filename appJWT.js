var express = require("express");
var session = require("express-session");
const models = require("./models/index");
const bodyParser = require('body-parser');
var loginRouter =require('./routes/login');
var registerRouter = require('./routes/register');
var apiRouter = require('./routes/API')
var app = express();

app.use(bodyParser.urlencoded({extended : false}));
app.use(session({
    secret : 'asdasdasdwqklj@dasd',
    resave : false,
    saveUninitalized : true
}));

app.use('/login',loginRouter);
app.use('/register',registerRouter);
app.use('/api',apiRouter);

models.sequelize.sync().then(() =>{
   console.log("DB 연결 성공");
}).catch(function (err){
    console.log("연결 실패");
    console.log(err);
});

app.listen(3000,function (){
    console.log("Connected 3000 port!!");
});
