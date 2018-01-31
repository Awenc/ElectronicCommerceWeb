//登录和注册中系列操作的路由封装

var express=require("express");
var router=express.Router();

var isUserExit=require("../lib/DataFormMysql/findUser");

router.get("/",function(req,res){
	res.render("loadAndReg",{
		"type":"1"
	});
});

router.post("/isUserExit",function(req,res){
	console.log(req.body.username+"...."+req.body.password+"正在尝试登录。。。。。");
	isUserExit.isUser(req.body.username,req.body.password,req,res);
});
module.exports = router; 