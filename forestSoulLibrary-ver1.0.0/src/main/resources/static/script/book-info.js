$(function () {
    let id = $.getUrlParam("bookId");
    var inventory;
    $.ajax({
        url:"/book/info",
        type:"GET",
        data:"bookId="+id,
        dataType:"JSON",
        success:function (json){
            if (json.state === 200){
                inventory = json.data.bookInventory;
                if (json.data.bookInventory > 0){
                    let tr =
                        "<img class='bookImg' src=\"#{img}\"/>\n" +
                        "<input type='hidden' id='bookId' value='#{bookId}'>"+
                        "        <div class=\"table-responsives\">\n" +
                        "          <p><span>"+json.data.bookName+"</span</p>\n" +
                        "          <hr>\n" +
                        "          <p><span>定价:</span><span>￥"+json.data.bookPrice+"</span></p>\n" +
                        "          <p><span>销量:</span>"+json.data.bookSales+"<span>件</span></p>\n" +
                        "          <p><span>作者:</span>"+json.data.bookAuthor+"<span>著</span></p>\n" +
                        "          <p><span>库存:</span>"+json.data.bookInventory+"</p>\n" +
                        "          <p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp森灵正版图书,为你的书籍保驾护航</p>\n" +
                        "          <hr>\n" +
                        "          <table>\n" +
                        "            <tr>\n" +
                        "              <td>购买数量:</td>\n" +
                        "              <td>\n" +
                        "                <div class=\"btn\">-</div>\n" +
                        "                  <input id=\"number-input\" value=\"1\"/>\n" +
                        "                <div class=\"btn\">+</div>\n" +
                        "              </td>\n" +
                        "            </tr>\n" +
                        "          </table>\n" +
                        "          <div><button class=\"btns\" id='addCar'>加入购物车</button></div>\n" +
                        "          <div><a href='#{url}' class=\"btns\" id='buyPdf'>#{pdf}</a></div>\n" +
                        "        </div>"

                    tr = tr.replace(/#{img}/g, json.data.bookImg);
                    tr = tr.replace(/#{bookId}/g, json.data.bookId);

                    $.ajax({
                        url:"/pdf/findPdf",
                        type:"GET",
                        data:"bookId="+id,
                        async:false,
                        dataType:"JSON",
                        success:function (json){
                            if (json.state === 200){
                                tr = tr.replace(/#{pdf}/g,"在线阅读" );
                                tr = tr.replace(/#{url}/g,json.data);
                            }else if (json.state === 5010){
                                tr = tr.replace(/#{pdf}/g,"购买电子书" );
                                tr = tr.replace(/#{url}/g,"login.html");
                            }else if (json.state === 5012){
                                tr = tr.replace(/#{pdf}/g,"购买电子书" );
                                tr = tr.replace(/#{url}/g,"pdf-pay.html?bookId="+id);
                            }else {
                                alert("未知异常")
                            }
                        },
                        error:function (xhr){
                            alert("获取数据时产生未知异常"+xhr.message);
                        }
                    })

                    $("#center").append(tr);
                }else {
                    let tr =
                        "<img class='bookImg' src=\"#{img}\"/>\n" +
                        "<div class=\"table-responsives\">\n" +
                        "   <p><span>"+json.data.bookName+"</span</p>\n" +
                        "   <hr>\n" +
                        "   <p><span>定价:</span><span>￥"+json.data.bookPrice+"</span></p>\n" +
                        "   <p><span>销量:</span>"+json.data.bookSales+"<span>件</span></p>\n" +
                        "   <p><span>作者:</span>"+json.data.bookAuthor+"<span>著</span></p>\n" +
                        "   <p><span>库存:</span>"+json.data.bookInventory+"</p>\n" +
                        "   <p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp森灵正版图书,为你的书籍保驾护航</p>\n" +
                        "   <hr>\n" +
                        "   <div><button type='button' id=\"btn\" class=\"btns NoGoods\">抱歉! 目前缺货</button></div>\n"+
                        "   <div><a href='#{url}' class=\"btns\" id='buyPdf'>#{pdf}</a></div>\n" +
                        "</div>"

                    tr = tr.replace(/#{img}/g, json.data.bookImg);
                    $.ajax({
                        url:"/pdf/findPdf",
                        type:"GET",
                        data:"bookId="+id,
                        async:false,
                        dataType:"JSON",
                        success:function (json){
                            if (json.state === 200){
                                tr = tr.replace(/#{pdf}/g,"在线阅读" );
                                tr = tr.replace(/#{url}/g,json.data);
                            }else if (json.state === 5010){
                                tr = tr.replace(/#{pdf}/g,"购买电子书" );
                                tr = tr.replace(/#{url}/g,"login.html");
                            }else if (json.state === 5012){
                                tr = tr.replace(/#{pdf}/g,"购买电子书" );
                                tr = tr.replace(/#{url}/g,"pdf-pay.html?bookId="+id);
                            }else {
                                alert("未知异常")
                            }
                        },
                        error:function (xhr){
                            alert("获取数据时产生未知异常"+xhr.message);
                        }
                    })
                    $("#center").append(tr);
                }

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

    $(document).on("click",".btn",function(){
        //判断是否点击-按钮
        if($(this).text() === "-"){
            var inpVla = Number($(this).next().val());
            console.log(inpVla)
            if(inpVla > 1){
                $(this).next().val(inpVla - 1);
            }
        } else if($(this).text() === "+") {                 //判断是否点击+按钮
            var inpVla = Number($(this).prev().val());
            console.log(inpVla)
            $(this).prev().val(inpVla + 1);
        }
    })

    $(document).on("blur","#number-input",function (){
        let val = $(this).val();
        if (val < 1 || val > inventory){
            $(this).val("1");
        }
    })

    $(document).on("click","#addCar",function (){
        let val = $("#number-input").val();
        let bookId = $("#bookId").val();
        $.ajax({
            url:"/car/addCar",
            type:"GET",
            data:"bookId="+bookId+"&bookCount="+val,
            async:false,
            dataType:"JSON",
            success:function (json){
                if (json.state === 200){
                    location.href="../customerWeb/customer-car.html"
                }else if (json.state === 5010){
                    location.href="../web/login.html"
                }else {
                    alert("未知异常")
                }
            },
            error:function (xhr){
                alert("获取数据时产生未知异常"+xhr.message);
            }
        })
    })

    $(document).on("click","#NoLogin",function (){
        location.href="../web/login.html";
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
                    "            <li><a href=\"/customerWeb/customer-Info.html\">个人主页</a></li>\n" +
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