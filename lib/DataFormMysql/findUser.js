// 获取数据库连接

var connection=require("./connection");
var con=new connection().connection;

var isU=false;
exports.isUser=function(username,password,req,res){
		
		console.log("进入数据库查询");
		con.query("SELECT *FROM users",function(err,result){
		if(err) throw err;
		for(var i=0;i<result.length;i++){
			if(result[i].username == username && result[i].password ==password ){				
				console.log("查询到结果 "+result[i].username+"...."+result[i].password+"   返回数据中。。。。。");
				isU=true;
				// 将登陆的账号添加到Session中
				req.session.username=result[i].username;

				res.render("index",{
					"username":req.session.username
				})
			}
		}
		if(!isU){
			res.send("<script>alert('账号或者密码错误');window.location.href='/load';</script>");						
		}
	});
}


exports.isUserExit=function(username,req,res){
		console.log("进入数据库查询");
		var exit=false;
		con.query("SELECT *FROM users",function(err,result){
			if(err) throw err;
			for(var i=0;i<result.length;i++){
				if(result[i].username == username){
					exit=true;
					res.json({"isExit": 1}); //发送json数前端表示这个用户名存在
					break;
				}
			}
			if(!exit) res.json({"isExit": 0}); //表示这个用户名可以用
		});
}