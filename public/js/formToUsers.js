// 表单验证的js

		//邮箱的判断
		$("#mail").focus(function(){$(".mailError").html("");});
		$("#mail").blur(function(event) {
			MailError();
		});

		//电话号码判断
		$("#phoneNum").focus(function(){$(".phoneError").html("");});
		$("#phoneNum").blur(function(event) {
			phoneError();
		});
		//登录账号判断
		$("#username").focus(function(){$(".usernameError").html("");});
		$("#username").blur(function(event) {
			usernameError();
		});
		//名称判断
		$("#name").focus(function(){$(".nameError").html("");});
		$("#name").blur(function(event) {
			nameError();
		});
		//密码判断
		$("#password").focus(function(){$(".passwordError").html("");});
		$("#password").blur(function(event) {
			passwordError();
		});
		//确认密码判断
		
		$("#sure").focus(function(){$(".sureError").html("");});
		$("#sure").blur(function(event) {
			sureError();
		});
		//最后注册的判断
		$(".myButtom").click(function(event) {
			/* Act on the event */
			if( MailError() &&phoneError() && usernameError() && nameError() && passwordError()&& sureError()){
				alert("您已经成功注册");
			}else{
				alert("请正确填写注册信息");
			}
		});
		//邮箱验证
		function MailError(){
						/* Act on the event */
			var Mail=$("#mail").val();
			var reg="^(\\w){6,11}@(qq|163|souhu).(com|cn|com.cn)";//正则表达式  记住“”中\要写成
			var n=Mail.search(reg);
			//alert(n);
			if(n==-1)
			{
				$(".mailError").html("请正确输入邮箱");
				$("#mail").css({border:"1px solid red"});
				return false;
			}
			else
			{
				
				$(".mailError").html("");
				$("#mail").css({border:"1px solid grey"});
				return true;
			}
		}
		//手机号码验证
		function phoneError(){
			var phone=$("#phoneNum").val();
			if(phone.length<11){
				$(".phoneError").html("请正确填写手机号码");
				$("#phoneNum").css({"border":"1px solid red"});
				return false;
			}
			else{
				$(".phoneError").html("");
				$("#phoneNum").css({"border":"1px solid grey"});
				return true;
			}
		}
		//登录账号判断
		function usernameError(){
			var phone=$("#username").val();
			if(phone.length<4){
				$(".usernameError").html("请正确填写登录账号");
				$("#username").css({"border":"1px solid red"});
				return false;
			}
			else{
				$(".usernameError").html("");
				$("#username").css({"border":"1px solid grey"});
				return true;
			}			
		}
		//名称显示
		function nameError(){
			var phone=$("#name").val();
			if(phone.length<2){
				$(".nameError").html("请正确填写名称");
				$("#name").css({"border":"1px solid red"});
				return false;
			}
			else{
				$(".nameError").html("");
				$("#name").css({"border":"1px solid grey"});
				return true;
			}
		}

		//密码   判断还不完全
		function passwordError(){
			var phone=$("#password").val();
			if(phone.length<8 ){
				$(".passwordError").html("请正确填写名称");
				$("#password").css({"border":"1px solid red"});
				return false;
			}
			else{
				$(".passwordError").html("");
				$("#password").css({"border":"1px solid grey"});
				return true;
			}			
		}

		function sureError(){
			var phone=$("#sure").val();
			if(phone!= $("#password").val()){
				$(".sureError").html("两次密码要保持一致");
				$("#sure").css({"border":"1px solid red"});
				return false;
			}
			else{
				$(".sureError").html("");
				$("#sure").css({"border":"1px solid grey"});
				return true;
			}			
		}
