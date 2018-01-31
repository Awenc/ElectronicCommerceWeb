var express=require("express");
var router=express.Router();
var userShopCar=require("../lib/DataFormMysql/dataToGoods/findGoodsInShopCar");
var BuyGoods=require("../lib/DataFormMysql/dataToGoods/BuyGoods");

router.get("/",function(req,res){
	// 判断该用户是否登录

	if(req.session.username == null || req.session.username == ""){
		res.send("<script>alert('请先登录');window.location.href='/load';</script>");
	}else{
		res.render("shopCar",{
			"username":req.session.username
		});
	}
	
});
router.post("/getAll",function(req,res){

	userShopCar.UserAddGoods(req.session.username,req,res);
});

router.get("/delGoods",function(req,res){

	userShopCar.delGoods(req,res);
});

router.get("/buyGoods",function(req,res){
	BuyGoods.buyGoodsInshop(req.session.username,req.query.sumprice,req,res);
});
router.get("/findALLOrder",function(req,res){
	BuyGoods.findAllOrder(req.session.username,req,res);
});
router.get("/findALLOrderGoods",function(req,res){
	BuyGoods.findAllOrderGoods(req.session.username,req,res);
});

module.exports = router; 