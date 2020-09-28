var express = require("express");
var router = express.Router();
let cookie = require('cookie');

let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwt");

router.get('/',function(req,res){
    let cookies = {};
    // 쿠키 parse
    if(req.headers.cookie !== undefined)
        cookies = cookie.parse(req.headers.cookie);
    let token = cookies.user;       // token 값 GET

    try {
        // verify 파라미터 (token,secret key)
        let decoded = jwt.verify(token, secretObj.secret);

        if(decoded)
        {
            res.send("권한이 있어서 API 수행 가능");
        }
        else
        {
            res.send("권한이 없습니다");
        }
    }
    catch{
        res.send("토큰 값이 만료되었습니다!");
    }

});

module.exports = router;