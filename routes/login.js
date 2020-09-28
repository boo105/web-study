var express = require("express");
var router = express.Router();
var models = require("../models");
// var mysql = require('mysql2');
const bodyParser = require('body-parser');

let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwt");

router.post('/',function(req,res){
    let username = req.body.username;
    let pwd = req.body.password;

    // sign 메소드를 호출해서 토큰을 생성합니다. 파라미터 (payload,비밀키,토큰정보,콜백함수)  이때 콜백함수를 작성하지않으면 동기처리가 됨...
    // default : HMAC SHA256
    let token = jwt.sign({
            username: username   // 토큰의 내용(payload)
        },
        secretObj.secret ,    // 비밀 키
        {
            expiresIn: '5m'    // 유효 시간은 5분
        })
    console.log(token);

    models.user.findOne({
        where : {
            user_id : username
        }
    }).then(user => {
        // 임시로 코드상에 비번 적어둔거임 절대로 이러면 안됨 원래
        if(user.password === "9546")
        {
            res.cookie("user",token);   // user 라는 쿠키생성 및 쿠키값을 토큰값 설정
            res.json({token : token});
            //res.send("토큰 생성완료!");
        }
        else
        {
            res.send("로그인 실패");
            return;
        }
    });


});

router.get('/',function(req,res){
    var output = `
    <div><h2>Login</h2></div>
    <form action="/login" method="post">
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