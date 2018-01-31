var connection=require("../connection");
var con=new connection().connection;

// 添加商品到购物车中
exports.UserAddGoods=function(goods_id,username,req,res){
	var shopcar_id="";
	var sql="SELECT * FROM shopcar WHERE shopcar_username=?"
	var sql_val=[username];
	con.query(sql,sql_val,function(err,result){
		if(err) throw err;
		shopcar_id=result[0].shopcar_id;
		console.log(shopcar_id);	
		console.log("开始添加");
		var addUserToshopCar = 'INSERT INTO shopdetail(shopdetail_shopcar_id,shopdetail_goods_id) VALUES(?,?)';
		var addUserToshopCar_Params = [shopcar_id,goods_id];
		con.query(addUserToshopCar,addUserToshopCar_Params,function (err, result) {
			if(err) throw err;
			if(result.affectedRows == 1){
					// 成功添加
					console.log("成功添加");
				res.json({"error":0});		
			}
			else{
				res.json({"error":1});	
			}		
		});	
	})	
}