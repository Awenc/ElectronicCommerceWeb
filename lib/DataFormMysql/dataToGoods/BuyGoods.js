var connection=require("../connection");
var con=new connection().connection;

// 将购物车中的所有物品 添加到订单中去
exports.buyGoodsInshop=function(username,sumprice,req,res){
	// username  是谁的订单
	// sumprice  总共多少钱
var  date=new Date();
var  id=date.getFullYear()+""+date.getMonth()+1+""+date.getDate()+""+date.getMilliseconds()+username;
var  userBuySql = 'INSERT INTO orders VALUES(?,?,?,?)';
var  userBuySql_Params = [id,username,sumprice,"已支付"];
var  isTrue=true;

con.query(userBuySql,userBuySql_Params,function (err, result) {
	if(err) throw err;
	if(result.affectedRows == 1){ 
		// 成功添加到了order表中
		//搜索该用户购物车中的商
		var sql="select * from goods,shopcar,shopdetail where goods.goods_id=shopdetail.shopdetail_goods_id and shopcar.shopcar_id=shopdetail.shopdetail_shopcar_id and shopcar.shopcar_username=?";
		var sql_val=[username];
		con.query(sql,sql_val,function(err,result){
		if(err) throw err;
			// 将所有的商品添加到order_detail表中
			var  toDetail = 'INSERT INTO order_detail VALUES(?,?)'
			for(var i=0;i<result.length;i++){				
				var  toDetail_Params = [id,result[i].goods_id];
				var  shopdetail_shopcar_id=result[i].shopdetail_shopcar_id;
				con.query(toDetail,toDetail_Params,function(err,result){
					if(err) throw err;
					if(result.affectedRows == 1){
						isTrue=true;
						// 删除购物车中的信息
						var delsql="DELETE FROM shopdetail WHERE shopdetail_shopcar_id =?";
						var delsql_val=[shopdetail_shopcar_id];
						con.query(delsql,delsql_val,function(err,result){
							if(err) throw err;
						})

					}else{
						isTrue=false;
					}
				});				
			}
			//返回操作		
		});
	}
	if(isTrue){
		res.json({"error":0});
	}else{
		res.json({"error":1});
	}

	
});

	// 然后找到该用户的购物车  将购物车中的goods_id 和order_id 添加到数据库中去
}

exports.findAllOrderGoods=function(username,req,res){
	var sql='select * from orders,order_detail,goods where orders.orderid=order_detail.order_id and order_detail.goods_id=goods.goods_id and orders.username=? and order_id=?';
	var sql_params=[username,req.query.type];
	con.query(sql,sql_params,function(err,result){
		if(err) throw err;
		res.json({"result":result});
	});
}
exports.findAllOrder=function(username,req,res){
	var sql='select * from orders where username=?';
	var sql_params=[username];
	con.query(sql,sql_params,function(err,result){
		if(err) throw err;
		res.json({"result":result});
	});		
}