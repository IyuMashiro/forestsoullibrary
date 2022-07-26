$(function () {
    let id = $.getUrlParam("bookId");
    let price = 0;
    $("#cal").click(function (){
        location.href = "../index.html"
    })

    $("#pay").click(function (){
        location.href = "../customerWeb/pay-pdf.html?bookId="+id+"&bookPrice="+price;
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

    $.ajax({
        url:"/pdf/getBook",
        type:"POST",
        data:"bookId="+id,
        async:false,
        dataType:"JSON",
        success:function (json){
            if (json.state === 200){
                let tr =
                   " <tr>\n" +
                    "   <td>\n" +
                    "     <img class='img' src=\"#{img}\"/>&nbsp&nbsp<span>"+json.data.bookName+"</span>\n" +
                    "    </td>\n" +
                    "    <td>￥<span>"+json.data.bookPrice+"</span></td>\n" +
                    "    <td><span></span></td>\n" +
                    "    <td>￥<span>"+json.data.bookPrice+"</span></td>\n" +
                    " </tr>"
                tr = tr.replace(/#{img}/g, json.data.bookImg);
                $("#goods").append(tr);
                price = json.data.bookPrice;
            }else {
                alert("未知异常")
            }
        },
        error:function (xhr){
            alert("获取数据时产生未知异常"+xhr.message);
        }
    })
})