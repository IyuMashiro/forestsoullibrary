$(function () {
    $.ajax({
        url:"recommend/book",
        type:"GET",
        dataType:"JSON",
        success:function (json){
           let list = json.data
            console.log(list)
            for (let i = 0;i < list.length-5;i++){
                let tr =
                    "<div class=\"col-sm-2\">\n" +
                    "   <a href=\"/customerWeb/book-info.html?bookId=#{req}\"><img src= \"#{img}\"/></a>\n" +
                    "   <div class='bookName'>"+list[i].bookName+"</div>\n" +
                    "   <div>"+list[i].bookAuthor+"<span>著</span></div>\n" +
                    "   <div class=\"price\">￥"+list[i].bookPrice+"</div>\n" +
                    "</div>"

                tr = tr.replace(/#{img}/g, list[i].bookImg);
                tr = tr.replace(/#{req}/g, list[i].bookId);

                $("#recommend1").append(tr);
            }
            for (let i = 5;i < list.length;i++){
                let tr =
                    "<div class=\"col-sm-2\">\n" +
                    "   <a href=\"/customerWeb/book-info.html?bookId=#{req}\"><img src= \"#{img}\"/></a>\n" +
                    "   <div class='bookName'>"+list[i].bookName+"</div>\n" +
                    "   <div>"+list[i].bookAuthor+"<span>著</span></div>\n" +
                    "   <div class=\"price\">￥"+list[i].bookPrice+"</div>\n" +
                    "</div>"

                tr = tr.replace(/#{img}/g, list[i].bookImg);
                tr = tr.replace(/#{req}/g, list[i].bookId);

                $("#recommend2").append(tr);
            }
        },
        error:function (xhr){
            alert("获取数据时发生未知异常"+xhr.message)
        }
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
                    "            <li><a href=\"customerWeb/customer-Info.html\">个人主页</a></li>\n" +
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

    $("#head-sub").click(function (){
        let keyword = $("#head-input").val();
        location.href="../customerWeb/book-search.html?keyword="+keyword;
    })
})