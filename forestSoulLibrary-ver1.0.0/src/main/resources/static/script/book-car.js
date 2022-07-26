$(function () {
    $.ajax({
        url:"/car/info",
        type:"POST",
        dataType:"JSON",
        success:function (json){
            if (json.state === 200){
                let list = json.data
                let totalPrice = 0;
                if (list.length === 0){
                    let tr =
                        "<tr>" +
                        "<td colspan='4'>您还没有添加您心仪的书籍</td>" +
                        "</tr>"
                    $("#info").append(tr);
                    $("#deleteAll").hide();
                    $("#pay").hide();
                }
               console.log(json.data);
               for (let i = 0;i < list.length;i++){
                   let tr =
                       "  <tr>\n" +
                       "     <td >\n" +
                       "        <div class=\"row\">\n" +
                       "            <div class=\"col-sm-2\"> <img class='img' src=\"#{img}\"/></div>\n" +
                       "            <div class=\"col-sm-3\"><span style='font-size: 14px'>"+list[i].bookName+"</span></div>\n" +
                       "            <div class=\"col-sm-5\"></div>\n" +
                       "        </div>\n" +
                       "     </td>\n" +
                       "     <td>￥<span class='price'>"+list[i].bookPrice+"</span></td>\n" +
                       "     <td>\n" +
                       "        <input type='hidden' class='bookId' value='#{bookId}'>"+
                       "        <div class=\"btn\">-</div>\n" +
                       "        <input class=\"number-input\" value=\"#{count}\"/>\n" +
                       "        <div class=\"btn\" >+</div>\n" +
                       "     </td>\n" +
                       "     <td>" +
                       "        <input type='hidden' class='bookId' value='#{bookId}'>" +
                       "        <a href=\"../customerWeb/customer-car.html\" class='delete'>删除</a>" +
                       "    </td>\n" +
                       " </tr>"
                   tr = tr.replace(/#{img}/g, list[i].bookImg);
                   tr = tr.replace(/#{bookId}/g, list[i].bookId);
                   let bookId = list[i].bookId;
                   var bookCount = 0;
                   $.ajax({
                       url:"/car/bookCount",
                       type:"GET",
                       data:"bookId="+bookId,
                       async:false,
                       dataType:"JSON",
                       success:function (json){
                           if (json.state === 200){
                             bookCount = json.data;

                           }else {
                               alert("未知异常")
                           }
                       },
                       error:function (xhr){
                           alert("获取数据时产生未知异常"+xhr.message);
                       }
                   })
                   tr = tr.replace(/#{count}/g, bookCount);
                   totalPrice += (list[i].bookPrice * bookCount);
                   $("#info").append(tr);
               }
                $("#total").html("￥"+totalPrice);
            }else {
                alert("未知异常")
            }
        },
        error:function (xhr){
            alert("获取数据时产生未知异常"+xhr.message);
        }
    })

    $("#back").click(function (){
        location.href="../index.html"
    })

    var total = 0;
    $(document).on("click",".btn",function(){
        //判断是否点击-按钮
        if($(this).text() === "-"){
            var inpVla = Number($(this).next().val());
            if(inpVla > 1){
                $(this).next().val(inpVla - 1);
                let count = Number($(this).next().val());
                let bookId = $(this).prev(".bookId").val()
                console.log(bookId);
                $.ajax({
                    url:"/car/setCount",
                    type:"GET",
                    data:"bookId="+bookId+"&bookCount="+count,
                    async:false,
                    dataType:"JSON",
                    success:function (json){
                        if (json.state === 200){
                            location.href="../customerWeb/customer-car.html"
                        }else {
                            alert("未知异常")
                        }
                    },
                    error:function (xhr){
                        alert("获取数据时产生未知异常"+xhr.message);
                    }
                })
            }
        } else if($(this).text() === "+") {                 //判断是否点击+按钮
            var inpVla = Number($(this).prev().val());
            if (inpVla < 99){
                $(this).prev().val(inpVla + 1);
                let count = $(this).prev().val()
                let bookId = $(this).prev().prev().prev(".bookId").val()
                console.log(bookId);
                $.ajax({
                    url:"/car/setCount",
                    type:"GET",
                    data:"bookId="+bookId+"&bookCount="+count,
                    async:false,
                    dataType:"JSON",
                    success:function (json){
                        if (json.state === 200){
                            location.href="../customerWeb/customer-car.html"
                        }else {
                            alert("未知异常")
                        }
                    },
                    error:function (xhr){
                        alert("获取数据时产生未知异常"+xhr.message);
                    }
                })
            }
        }
    })

    $("#head-sub").click(function (){
        let keyword = $("#head-input").val();
        location.href="../customerWeb/book-search.html?keyword="+keyword;
    })

    $("#pay").click(function () {
        location.href="../customerWeb/customer-indent.html";
    })

    $(document).on("blur",".number-input",function (){
        let val = $(this).val();
        if (val < 1 || val > 99){
            $(this).val("1");
            val = $(this).val();
            let bookId = $(this).prev().prev(".bookId").val()
            $.ajax({
                url:"/car/setCount",
                type:"GET",
                data:"bookId="+bookId+"&bookCount="+val,
                async:false,
                dataType:"JSON",
                success:function (json){
                    if (json.state === 200){
                        location.href="../customerWeb/customer-car.html"
                    }else {
                        alert("未知异常")
                    }
                },
                error:function (xhr){
                    alert("获取数据时产生未知异常"+xhr.message);
                }
            })
        }
        let bookId = $(this).prev().prev(".bookId").val()
        $.ajax({
            url:"/car/setCount",
            type:"GET",
            data:"bookId="+bookId+"&bookCount="+val,
            async:false,
            dataType:"JSON",
            success:function (json){
                if (json.state === 200){
                    location.href="../customerWeb/customer-car.html"
                }else {
                    alert("未知异常")
                }
            },
            error:function (xhr){
                alert("获取数据时产生未知异常"+xhr.message);
            }
        })
    })

    $("#deleteAll").click(function () {
        $.ajax({
            url:"/car/deleteAll",
            type:"GET",
            dataType:"JSON",
            success:function (json){
                if (json.state === 200){

                }else {
                    alert("未知异常")
                }
            },
            error:function (xhr){
                alert("获取数据时产生未知异常"+xhr.message);
            }
        })
    })

    $(document).on("click",".delete",function (){
        let bookId = $(this).prev(".bookId").val();
        $.ajax({
            url:"/car/deleteOnce",
            type:"GET",
            data:"bookId="+ bookId,
            dataType:"JSON",
            success:function (json){
                if (json.state === 200){

                }else {
                    alert("未知异常")
                }
            },
            error:function (xhr){
                alert("获取数据时产生未知异常"+xhr.message);
            }
        })
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