$(function (){
    let indentId = $.getUrlParam("indentId");

    $("#indentId").html("订单编号:"+indentId);

    $("#backIndex").click(function (){
        location.href="../index.html";
    })

    $.ajax({
        url:"/customer/getById",
        type:"POST",
        dataType:"JSON",
        success:function (json){
            if (json.state === 200){
                let tr =
                    " <li class=\"dropdown\">\n" +
                    "          <a href=\"#\" id=\"customerName\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">"+json.data.customerName+"<span class=\"caret\"></span></a>\n" +
                    "          <ul class=\"dropdown-menu\">\n" +
                    "            <li><a href=\"customer-Info.html\">个人主页</a></li>\n" +
                    "            <li><a href=\"/customer/logout\">注销</a></li>\n" +
                    "          </ul>\n" +
                    "        </li>\n" +
                    "        <img id=\"head-img\" src=\"#{img}\">"
                tr = tr.replace(/#{img}/g, json.data.customerIcon);
                $("#noLogin").hide();
                $("#login-bar").append(tr);
            }else if (json.state() === 5010){
            }else {
                alert("未知异常")
            }
        },
        error:function (xhr){
            alert("获取数据时产生未知异常"+xhr.message);
        }
    })




})