var express=require("express");
var app=express();
var path=require("path");
var bodyParser=require("body-parser");
var PORT=3000;
var session=require("express-session");

var load=require("./router/load");
var Reg=require("./router/Reg");
var userMsg=require("./router/userMsg");
var goodsShow=require("./router/goodsShow");
var shopCar=require("./router/shopCar");


// 使用jade模板引擎
app.set("views","./views");
app.set("view engine","jade");
//session的使用
app.use(session({secret:'test',name:"user" ,cookie:{maxAge: 60*1000*3 } }));
//静态文件目录加载
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT);
console.log("网站开启~");


app.get("/",function(req,res){
	// console.log(req.session);
	res.render("index",{
		"username":req.session.username
	});
})


//获取post参数需要的东西
app.use(bodyParser.urlencoded({ extended: false }));  

app.use("/load",load);
app.use("/stop",function(req,res){
	req.session.username="";
	res.render("index");
});
app.use("/aboutUs",function(req,res){
	res.render("aboutUs",{
		"username":req.session.username
	});
})

app.use("/Reg",Reg);
app.use("/userMsg",userMsg);
app.use("/goods",goodsShow);
app.use("/shopCar",shopCar);



