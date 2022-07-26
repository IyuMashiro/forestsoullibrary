$(function () {
    $("#head-sub").click(function (){
        let keyword = $("#head-input").val();
        location.href="../customerWeb/book-search.html?keyword="+keyword;
    })

    $("#back").click(function (){
        location.href="../customerWeb/customer-car.html"
    })

    $(document).on("click",".useThis",function (){
        $(".useThis").show();
        $(".use").hide()
        $(this).hide();
        $(this).next().next(".use").show().empty().append("使用中").attr("id","use")

    })

    $("#pay").click(function (){
        let aId  = $("#use").prev("input").val();
        if (aId === undefined){
            aId = $("#default").attr("class");
        }
        $.ajax({
            url:"/indent/addIndent",
            data: "addressId="+aId,
            type:"POST",
            dataType:"JSON",
            success:function (json){
                if (json.state === 200){
                    let total = $("#total").text();
                    let bookCount = $("#totalBooKCount").val();
                        location.href="../customerWeb/pay.html?indentId="+json.data+"&bookCount="+bookCount+"&bookPrice="+total;
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

    $.ajax({
        url: "/address",
        type:"GET",
        dataType:"JSON",
        success:function (json){
            if (json.state === 200){
                let list = json.data;
                for (let i = 0;i < list.length;i++){
                    let tr =
                        "<div class=\"alert alert-danger address-main\" role=\"alert\" >\n" +
                        "          <p class=\"glyphicon glyphicon-map-marker icon\" aria-hidden=\"true\"></p>\n" +
                        "          <p class=\"name\">#{name}</p>\n" +
                        "          <p class=\"phone\">#{name}</p>\n" +
                        "          <span class=\"address\">"+list[i].provinceName+" "+list[i].cityName+" "+list[i].areaName+" "+list[i].addressPosition+"</span>\n" +
                        "           <div class='btn-address'>" +
                        "            #{tag}" +
                        "            <button type=\"button\" onclick='updateAddress(#{aid})' class=\"btn btn-default update\">修改地址</button>\n" +
                        "            <button type=\"button\"  class=\"btn btn-default update useThis\">使用此地址</button>\n" +
                        "            <input type='hidden' value='#{aid}'>   " +
                        "            <span class='use'></span>" +
                        "          </div> " +
                        "</div>\n"
                    tr = tr.replace(/#{name}/g,list[i].addressName);
                    tr = tr.replace(/#{phone}/g,list[i].addressPhone);
                    tr = tr.replace(/#{aid}/g,list[i].addressId);

                    if (list[i].addressDefault === 1){
                        let aid = list[i].addressId;
                        tr = tr.replace(/#{tag}/g,"<span id=\"default\" class="+aid+">默认地址</span>");
                    }else {
                        tr = tr.replace(/#{tag}/g," <button type=\"button\" onclick='setDefault(#{aid})' class=\"btn btn-default setDefault\">设为默认</button>");
                        tr = tr.replace(/#{aid}/g,list[i].addressId);
                    }

                    $("#address").append(tr);
                }

                if (list.length === 3){
                    $("#addAddress").hide();
                }
            }else{
                alert("收货地址数据加载失败")
            }
        },
        error:function (xhr){
            alert("获取数据时产生未知异常"+xhr.message);
        }
    })

    $.ajax({
        url:"/car/info",
        type:"POST",
        dataType:"JSON",
        success:function (json){
            if (json.state === 200){
                let list = json.data
                let totalPrice = 0;
                let bookCount = 0;
                let totalBookCount = 0;
                console.log(json.data);
                for (let i = 0;i < list.length;i++){
                    let tr =
                        " <tr>\n" +
                        "   <td class=\"move\">\n" +
                        "   <img class='GoodsImg' src=\"#{img}\"/>&nbsp&nbsp<span>"+list[i].bookName+"</span>\n" +
                        "   </td>\n" +
                        "   <td>￥<span>"+list[i].bookPrice+"</span></td>\n" +
                        "   <td>#{count}</td>\n" +
                        "   <td></td>" +
                        "</tr>"
                    tr = tr.replace(/#{img}/g, list[i].bookImg);
                    let bookId = list[i].bookId;
                    $.ajax({
                        url:"/car/bookCount",
                        type:"GET",
                        data:"bookId="+bookId,
                        async:false,
                        dataType:"JSON",
                        success:function (json){
                            if (json.state === 200){
                                bookCount = json.data;
                                totalBookCount += bookCount;
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
                    $("#goods").append(tr);
                }
                $("#totalBooKCount").val(totalBookCount);
                $("#total").html(totalPrice);
            }else {
                alert("未知异常")
            }
        },
        error:function (xhr){
            alert("获取数据时产生未知异常"+xhr.message);
        }
    })

})

function  showAddressList(){
    $("#address").empty();
    $.ajax({
        url: "/address",
        type:"GET",
        dataType:"JSON",
        success:function (json){
            if (json.state === 200){
                let list = json.data;
                for (let i = 0;i < list.length;i++){
                    let tr =
                        "<div class=\"alert alert-danger address-main\" role=\"alert\" >\n" +
                        "          <p class=\"glyphicon glyphicon-map-marker icon\" aria-hidden=\"true\"></p>\n" +
                        "          <p class=\"name\">#{name}</p>\n" +
                        "          <p class=\"phone\">#{name}</p>\n" +
                        "          <span class=\"address\">"+list[i].provinceName+" "+list[i].cityName+" "+list[i].areaName+" "+list[i].addressPosition+"</span>\n" +
                        "           <div class='btn-address'>" +
                        "            #{tag}" +
                        "            <button type=\"button\" onclick='updateAddress(#{aid})' class=\"btn btn-default update\">修改地址</button>\n" +
                        "            <button type=\"button\"  class=\"btn btn-default update useThis\">使用此地址</button>\n" +
                        "            <span class='use'></span>" +
                        "          </div> " +
                        "</div>\n"

                    tr = tr.replace(/#{name}/g,list[i].addressName);
                    tr = tr.replace(/#{phone}/g,list[i].addressPhone);
                    tr = tr.replace(/#{aid}/g,list[i].addressId);

                    if (list[i].addressDefault === 1){
                        tr = tr.replace(/#{tag}/g,"<span id=\"default\">默认地址</span>");
                    }else {
                        tr = tr.replace(/#{tag}/g," <button type=\"button\" onclick='setDefault(#{aid})' class=\"btn btn-default setDefault\">设为默认</button>");
                        tr = tr.replace(/#{aid}/g,list[i].addressId);
                    }

                    $("#address").append(tr);
                }

                if (list.length === 3){
                    $("#add-address").hide();
                }else {
                    $("#add-address").show();
                }
            }else{
                alert("收货地址数据加载失败")
            }
        },
        error:function (xhr){
            alert("获取数据时产生未知异常"+xhr.message);
        }
    })

    $(".update").on("click",function (){
        location.href="../../templates/customer-Info-updateAddress.html"
    })
}

function setDefault(aid){
    $.ajax({
        url:"/address/"+aid+"/setDefault",
        type:"POST",
        dataType:"JSON",
        success:function (json){
            if (json.state === 200){
                showAddressList();
            }else {
                alert("设置失败")
            }
        },
        error:function (xhr){
            alert("设置默认地址时产生未知异常"+xhr.message);
        }

    })
}

function updateAddress(aid){
    location.href="/address/"+aid+"/indentToUpdate"
}