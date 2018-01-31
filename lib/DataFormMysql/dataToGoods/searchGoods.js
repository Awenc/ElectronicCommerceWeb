var connection=require("../connection");
var con=new connection().connection;


exports.findGoodsByType=function(type,req,res){
		
		console.log("进入数据库查询商品");
		var sql="SELECT *FROM goods WHERE goods_type=?"
		var sql_val=[type];
		con.query(sql,sql_val,function(err,result){
		if(err) throw err;
			// console.log(result[i]);
		res.json({"goods":result});
		
	});
}