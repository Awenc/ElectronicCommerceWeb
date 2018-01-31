var connection=require("./connection");
var con=new connection().connection;



exports.addUser=function(option,req,res){
console.log("添加新用户到数据库中");
//添加到user表中
var  userAddSql = 'INSERT INTO users(id,username,password) VALUES(0,?,?)';
var  userAddSql_Params = [option.username,option.password];
con.query(userAddSql,userAddSql_Params,function (err, result) {
	if(err) throw err;
	if(result.affectedRows == 1){   //用户添加进去了
		var  userAddSql1 = 'INSERT INTO user_msg(username,nickname,sex,age,tel) VALUES(?,?,?,?,?)';
		var  userAddSql_Params1 = [option.username,option.nickname,option.sex,option.age,option.tel];

		con.query(userAddSql1,userAddSql_Params1,function (err, result) {
			if(err) throw err;
			if(result.affectedRows == 1){
				addToShopCar(option.username,req,res)				
			}

		});	
	}
	else{
		res.send("数据处理错误 请重新注册");
	}
	console.log("新用户添加到user表中")
});
	//添加到user-msg表中

}


//在购物车表中添加该用户
function addToShopCar(username,req,res){
	var  addUserToshopCar = 'INSERT INTO shopcar(shopcar_id,shopcar_username) VALUES(0,?)';
	var  addUserToshopCar_Params = [username];
	con.query(addUserToshopCar,addUserToshopCar_Params,function (err, result) {
			if(err) throw err;
			if(result.affectedRows == 1){
				res.send("<script>alert('注册成功 请返回登录');window.location.href='/load';</script>");		
			}
			else{
				res.send("<script>alert('服务器发生错误，请重新注册');window.location.href='/Reg';</script>");	
			}		
	});
}