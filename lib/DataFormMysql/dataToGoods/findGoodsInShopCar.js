var connection=require("../connection");
var con=new connection().connection;

//通过session 的username 查找到相应购物车中的所有商品信息
exports.UserAddGoods=function(username,req,res){

		console.log("进入数据库查询用户"+username+"的购物车");
		var sql="select * from goods,shopcar,shopdetail where goods.goods_id=shopdetail.shopdetail_goods_id and shopcar.shopcar_id=shopdetail.shopdetail_shopcar_id and shopcar.shopcar_username=?";
		var sql_val=[username];
		con.query(sql,sql_val,function(err,result){
		if(err) throw err;
	    // console.log(result[0]);
		res.json({"allGoods":result});
		
	});
}
// 删除某个购物车中的商品
exports.delGoods=function(req,res){
		var sql="DELETE FROM shopdetail WHERE shopdetail_shopcar_id =? and shopdetail_goods_id=?";
		var sql_val=[req.query.shopCar_id,req.query.goods_id];
		con.query(sql,sql_val,function(err,result){
			if(err) throw err;
			// console.log(result);
			if(result.affectedRows == 1){
				res.json({"error":0});
			}else{
				res.json({"error":1});
			}
		});		
}
//  sql  多表连接
 // select goods_id,goods_name,goods_msg,goods_price,goods_img from goods,shopcar,shopdetail where goods.goods_id=shopdetail.shopdetail_goods_id and shopcar.shopcar_id=shopdetail.shopdetail_shopcar_id and shopcar.shopcar_username='123456';