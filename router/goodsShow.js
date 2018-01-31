var express=require("express");
var router=express.Router();
var findGoods=require("../lib/DataFormMysql/dataToGoods/searchGoods");
var addGoodsToShopCar=require("../lib/DataFormMysql/dataToGoods/addGoodsToShopCar");
router.get("/",function(req,res){
	console.log(req.query.type);
	if(req.query.type == ""){
		res.render("goods",{
			"username":req.session.username
		});		
	}else{
		res.render("goods",{
			"username":req.session.username,
			"type":req.query.type
		});			
	}

});
router.get("/search_type",function(req,res){
	console.log(req.query.type);
	findGoods.findGoodsByType(req.query.type,req,res);

})

router.get("/addToShopCar",function(req,res){
	if(req.session.username ==""){
		res.send("<script>alert('请登录');window.location.href='/load';</script>");
	}else{
		console.log(req.query.goods_id+".."+req.session.username);
		addGoodsToShopCar.UserAddGoods(req.query.goods_id,req.session.username,req,res);
	}
})

module.exports = router; 