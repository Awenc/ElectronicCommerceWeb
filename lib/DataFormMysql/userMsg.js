var connection=require("./connection");
var con=new connection().connection;

exports.findUserMsg=function(username,req,res){
	var temp={
		"username":"",
		"nickname":"",
		"age":"",
		"sex":"",
		"tel":""		
	};
  	var msg;
	var sql="SELECT *FROM user_msg WHERE username=?"
	var sql_val=[username];
	con.query(sql,sql_val,function(err,result){
		
		if(result.length==1){
			temp=result[0];
			msg=1;
		}else if(result.length == 0){
			msg=0
		}else{
			for(var i=0;i<result.length;i++){
				console.log(result[i]);
			}	
		}
		res.render("userMsg",{
			"usermsg":temp,
			"msg":msg,
			"username":username
		});	
	})
}
// 在数据库中修改用户信息
exports.changeUser=function(option,req,res){
	var  userAddSql = "UPDATE user_msg SET nickname=?,age=?,sex=?,tel=? WHERE username=?";
	var  userAddSql_Params = [option.nickname,option.age,option.sex,option.tel,option.username];
	console.log(option);
	con.query(userAddSql,userAddSql_Params,function(err,result){
		if(err) throw err;
		console.log(result);
		if(result.changedRows == 1){
			res.render("userMsg",{
			"usermsg":{
					"username":option.username,
					"nickname":option.nickname,
					"age":option.age,
					"sex":option.sex,
					"tel":option.tel
				},
			"msg":"1",
			"username":option.username
			});
		}else{
			res.send("<script>alert('修改错误');window.location.href='/';</script>");
		}

	});	
}