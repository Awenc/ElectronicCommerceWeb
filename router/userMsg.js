var express=require("express");
var router=express.Router();
var userMsg=require("../lib/DataFormMysql/userMsg");
router.get("/",function(req,res){
	// 判断该用户是否登录

	if(req.session.username == null || req.session.username == ""){
		res.send("<script>alert('请先登录');window.location.href='/load';</script>");
	}else{

		// 在数据库中查找该用户的所有信息
		userMsg.findUserMsg(req.session.username,req,res);		
	}
	
	

});
// 修改用户信息
router.post("/changeUser",function(req,res){
	console.log(req.session);
	var option={
		"nickname":req.body.nickname,
		"age":req.body.age,
		"sex":req.body.sex,
		"tel":req.body.tel,
		"username":req.session.username
	}
	userMsg.changeUser(option,req,res);
})

module.exports = router;