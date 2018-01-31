var mysql=require("mysql");  //导入模块

function connection(){
	this.connection=mysql.createConnection({
		host:"127.0.0.1",
		user:"root",
		password:"0512ccw",
		port:3306,
		database:"ecwebdb"
	});	
}
//连接的时候需要的数据

module.exports=connection;