$(function(){
	
	

	$(".LMS-main-bar").on("click","ul li",function () {
		$(".LMS-main-bar ").children("ul").children("li").removeClass("active")
		$("#LMS-main-icon").css("display","none")
		$(this).addClass("active")
	})
	
	$("#LMS-main-side").children("ul").children("li").click(function(){
		$("#LMS-main-side ").children("ul").children("li").removeClass("active")
		$(this).addClass("active")
		$("#LMS-main-content").remove()
		$("#LMS-main-icon").css("display","block")
		var id = $(this).attr("id")
		switch(id){
			case 'side-1':
			$("#bar1").css("display","block")
			$("#bar2").css("display","none")
			$("#bar3").css("display","none")
			$("#bar4").css("display","none")
			break;
			case 'side-2':
				$("#bar1").css("display","none")
				$("#bar2").css("display","block")
				$("#bar3").css("display","none")
				$("#bar4").css("display","none")
			break;
			case 'side-3':
				$("#bar1").css("display","none")
				$("#bar2").css("display","none")
				$("#bar3").css("display","block")
				$("#bar4").css("display","none")
			break;
			case 'side-4':
				$("#bar1").css("display","none")
				$("#bar2").css("display","none")
				$("#bar3").css("display","none")
				$("#bar4").css("display","block")
			break;
		}
	})
	
	$.ajax({
		url:"/admin/getData",
		type:"POST",
		data:$("#login-form").serialize(),
		dataType:"JSON",
		success:function (json){
			if (json.state === 200){
				$("#admin-acct").html(json.data.loginAcct)
			}else {
				alert("获取数据失败")
			}
		},
		error:function (xhr){
			alert("获取数据时产生未知异常"+xhr.message);
		}
	})

	$("#side-1").click(function (){
		$.ajax({
			url:"/admin/getData",
			type:"POST",
			dataType:"JSON",
			success:function (json){
				if (json.state === 200){
					const leven = json.data.leven;
					if (leven !== 1){
						$("#admin-control").hide();
						$("#customer").attr("href","admin-customer-page.html")
					}else {
						$("#customer").attr("href","admin-cus-page.html")
					}
				}else {
					alert("获取数据失败")
				}
			},
			error:function (xhr){
				alert("获取数据时产生未知异常"+xhr.message);
			}
		})
	})

	$("#logout").click(function (){
		$.ajax({
			url:"/admin/logout",
			type:"POST",
			dataType:"JSON",
			success:function (json){
				if (json.state === 200){
					location.href="../web/admin-login.html";
				}else {
					alert("获取数据失败")
				}
			},
			error:function (xhr){

			}
		})
	})


})