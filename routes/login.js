var express = require("express");
var router = express.Router();
// var mysql = require('mysql');
const bodyParser = require('body-parser');

router.post('/',function(req,res){
    var username = req.body.username;
    var pwd = req.body.password;
    res.send(username);
});

router.get('/',function(req,res){
    var output = `
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