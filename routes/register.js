var express = require("express");
var router = express.Router();
var models = require("../models");
const bodyParser = require('body-parser');

router.post('/',function (req,res){
    var user_id = req.body.username;
    var pwd = req.body.password;

    // db에 레코드 추가
    models.user.create({
        user_id : user_id,
        password : pwd
    }).then(result => {
        console.log("데이터 추가 완료!");
        res.redirect("/login");
    }).catch(err=>{
        console.log("데이터 추가 실패");
    });
    
});

router.get('/',function(req,res){
    var output = `
    <div><h2>Register</h2></div>
    <form action="/register" method="post">
        <p>
            <input type="text" name="username" placeholder="username">
        </p>
        <p>
        <input type="password" name="password" placeholder="password">
        </p>
        <p>
            <input type="submit">
        </p>
    </form>
    `;
    res.send(output);
});

module.exports = router;
