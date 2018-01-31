var express=require("express");
var router=express.Router();
var isUserExit=require("../lib/DataFormMysql/findUser");
var addUser=require("../lib/DataFormMysql/addUser");

router.get("/",function(req,res){
	res.render("loadAndReg",{
		"type":"2"
	});
});


//验证账号是否已经注册
router.get("/isUsernameExist",function(req,res){
	console.log("接受到ajax传输的数据:"+req.query.username+".....验证该账号是否已经注册");
	isUserExit.isUserExit(req.query.username,req,res);
})

//添加用户到数据库中

router.post("/addUser",function(req,res){
	var option={
		"username":req.body.username,
		"password":req.body.password,
		"nickname":req.body.nickname,
		"sex":req.body.sex,
		"age":req.body.age,
		"tel":req.body.tel,
	};
	addUser.addUser(option,req,res);
})
module.exports = router; 