$(function () {
    $("#add-address").click(function () {
        location.href="customer-Info-addAddress.html"
    })
    $("#change-pwd").click(function (){
        location.href="customer-Info-updatePassword.html"
    })
    $("#modification-info").click(function (){
        location.href="customer-Info-updateName.html"
    })

    $("#head-sub").click(function (){
        let keyword = $("#head-input").val();
        location.href="../customerWeb/book-search.html?keyword="+keyword;
    })

    $.ajax({
        url:"/customer/getById",
        type:"POST",
        data:$("").serialize(),
        dataType:"JSON",
        success:function (json){
            if (json.state === 200){
                $("#user-acct").html(json.data.customerLogin);
                $("#user-name").html(json.data.customerName);
                $("#user-id-val").html(json.data.customerId);
                $("#book").html(json.data.customerBookCount);
                $("#price").html("￥"+json.data.customerPriceCount);
                $("#head-img").attr("src",json.data.customerIcon);
                $("#icon").attr("src",json.data.customerIcon);
                $("#customerName").html(json.data.customerName);
            }else{
                alert("数据不存在")
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
                       "          <p class=\"glyphicon glyphicon-map-marker\" aria-hidden=\"true\"></p>\n" +
                       "          <p class=\"name\">#{name}</p>\n" +
                       "          <p class=\"phone\">#{name}</p>\n" +
                       "          <span class=\"address\">"+list[i].provinceName+" "+list[i].cityName+" "+list[i].areaName+" "+list[i].addressPosition+"</span>\n" +
                       "           <div class='btn-address'>" +
                       "            #{tag}" +
                       "            <button type=\"button\" onclick='deleteAddress(#{aid})' class=\"btn btn-default delete\">删除</button>\n" +
                       "            <button type=\"button\" onclick='updateAddress(#{aid})' class=\"btn btn-default update\">修改地址</button>\n" +
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
               }
            }else{
                alert("收货地址数据加载失败")
            }
        },
        error:function (xhr){
            alert("获取数据时产生未知异常"+xhr.message);
        }
    })


})

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
                        "          <p class=\"glyphicon glyphicon-map-marker\" aria-hidden=\"true\"></p>\n" +
                        "          <p class=\"name\">#{name}</p>\n" +
                        "          <p class=\"phone\">#{name}</p>\n" +
                        "          <span class=\"address\">"+list[i].provinceName+" "+list[i].cityName+" "+list[i].areaName+" "+list[i].addressPosition+"</span>\n" +
                        "           <div class='btn-address'>" +
                        "            #{tag}" +
                        "            <button type=\"button\" onclick='deleteAddress(#{aid})' class=\"btn btn-default delete\">删除</button>\n" +
                        "            <button type=\"button\" onclick='updateAddress(#{aid})' class=\"btn btn-default update\">修改地址</button>\n" +
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

function deleteAddress(aid){
    $.ajax({
        url:"/address/"+aid+"/delete",
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
    location.href="/address/"+aid+"/toUpdate"
}