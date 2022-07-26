$(function (){
    $("#inputName").blur(checkName);
    $("#inputPhone").blur(checkPhone);
    $("#inputPosition").blur(checkPosition);
    loadCity();
    loadArea();


    $("#cal").click(function (){
        location.href="/customerWeb/customer-Info.html"
    })

    $("#head-sub").click(function (){
        let keyword = $("#head-input").val();
        location.href="/customerWeb/book-search.html?keyword="+keyword;
    })

    $.ajax({
        url:"/customer/getById",
        type:"POST",
        data:$("").serialize(),
        dataType:"JSON",
        success:function (json){
            if (json.state === 200){

                $("#head-img").attr("src",json.data.customerIcon);
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
        url:"/city/",
        type:"GET",
        data:"parentId=10000000",
        dataType:"JSON",
        success:function (json){
            if (json.state === 200){
                let list = json.data;
                for (let i = 0;i < list.length;i++){
                    let opt = "<option value='"+list[i].id+"'>"+list[i].name+"</option>";
                    $("#select-province").append(opt);
                }
            }else{
                alert("数据加载失败")
            }
        },
        error:function (xhr){
        }
    })


    $("#select-province").change(function (){
        let parent = $("#select-province").val();
        $("#select-city").empty().append(" <option>--请选择--</option>");
        $("#select-area").empty().append(" <option>--请选择--</option>");
        $.ajax({
            url:"/city/",
            type:"GET",
            data:"parentId="+parent,
            dataType:"JSON",
            success:function (json){
                if (json.state === 200){
                    let list = json.data;
                    for (let i = 0;i < list.length;i++){
                        let opt = "<option value='"+list[i].id+"'>"+list[i].name+"</option>";
                        $("#select-city").append(opt);
                    }

                }else{
                    alert("数据加载失败")
                }
            },
            error:function (xhr){
            }
        })
    })

    $("#select-city").change(function (){
        let parent = $("#select-city").val();
        $("#select-area").empty().append(" <option >--请选择--</option>");
        $.ajax({
            url:"/city/",
            type:"GET",
            data:"parentId="+parent,
            dataType:"JSON",
            success:function (json){
                if (json.state === 200){
                    let list = json.data;
                    for (let i = 0;i < list.length;i++){
                        let opt = "<option value='"+list[i].id+"'>"+list[i].name+"</option>";
                        $("#select-area").append(opt);
                    }
                }else{
                    alert("数据加载失败")
                }
            },
            error:function (xhr){
                alert("获取数据时产生未知异常"+xhr.message);
            }
        })
    })
    const aid = $("#addressId").attr("name")
     $("#updata").click(function(){
        let flag = true;
        if (!checkName()) flag = false
        if (!checkPhone()) flag = false
        if (!checkPosition()) flag = false
        if (!checkProvince()) flag = false
        if (!checkCity()) flag = false
        if (!checkArea()) flag = false
        if (flag){
            $.ajax({
                url:"/address/"+aid+"/update",
                type:"POST",
                data:$("#form-address").serialize(),
                dataType:"JSON",
                success:function (json){
                    if (json.state === 200){
                        location.href="/customerWeb/customer-Info.html"
                    }else if (json.state === 5003){
                        alert("地址数已达上限")
                        location.href="/customerWeb/customer-Info.html"
                    }else {
                        alert("更新数据失败")
                    }
                },
                error:function (xhr){
                    alert("获取数据时产生未知异常"+xhr.message);
                }
            })
            return false;
        }
    })
})

function checkName() {
    const Name = $("#inputName").val().trim();
    const reg = /^[\u4E00-\u9FA5A-Za-z0-9_]{2,8}$/
    if(reg.test(Name) === false){
        $("#NameErrorMsg").addClass("error").removeClass("OK");
        return false;
    }else {
        $("#NameErrorMsg").addClass("OK").removeClass("error");
        return true;
    }}

function checkPhone(){
    const Name = $("#inputPhone").val().trim();
    const reg = /^[0-9]{11}$/
    if(reg.test(Name) === false){
        $("#phoneErrorMsg").addClass("error").removeClass("OK");
        return false;
    }else {
        $("#phoneErrorMsg").addClass("OK").removeClass("error");
        return true;
    }
}

function checkPosition(){
    const Name = $("#inputPosition").val().trim();
    const reg = /^[\u4E00-\u9FA5A-Za-z0-9_]{1,50}$/
    if(reg.test(Name) === false){
        $("#positionErrorMsg").addClass("error").removeClass("OK");
        return false;
    }else {
        $("#positionErrorMsg").addClass("OK").removeClass("error");
        return true;
    }
}

function checkProvince() {
    const province = $("#select-province").val();
    if (province === "--请选择--"){
        $("#cityErrorMsg").addClass("error").removeClass("OK");
        return false
    }else {
        $("#cityErrorMsg").addClass("OK").removeClass("error");
        return true
    }

}

function checkCity() {
    const city = $("#select-city").val();
    if (city === "--请选择--"){
        $("#cityErrorMsg").addClass("error").removeClass("OK");
        return false
    }else {
        $("#cityErrorMsg").addClass("OK").removeClass("error");
        return true
    }
}

function checkArea() {
    const area = $("#select-area").val();
    if (area === "--请选择--"){
        $("#cityErrorMsg").addClass("error").removeClass("OK");
        return false
    }else {
        $("#cityErrorMsg").addClass("OK").removeClass("error");
        return true
    }
}

function loadCity(){
    const city = $("#select-province").val();
    $.ajax({
        url:"/city/",
        type:"GET",
        data:"parentId="+city,
        dataType:"JSON",
        success:function (json){
            if (json.state === 200){
                let list = json.data;
                for (let i = 0;i < list.length;i++){
                    let opt = "<option value='"+list[i].id+"'>"+list[i].name+"</option>";
                    $("#select-city").append(opt);
                }
            }else{
                alert("数据加载失败")
            }
        },
        error:function (xhr){
            alert("获取数据时产生未知异常"+xhr.message);
        }
    })
}

function loadArea(){
    const city = $("#select-city").val();
    $.ajax({
        url:"/city/",
        type:"GET",
        data:"parentId="+city,
        dataType:"JSON",
        success:function (json){
            if (json.state === 200){
                let list = json.data;
                for (let i = 0;i < list.length;i++){
                    let opt = "<option value='"+list[i].id+"'>"+list[i].name+"</option>";
                    $("#select-area").append(opt);
                }
            }else{
                alert("数据加载失败")
            }
        },
        error:function (xhr){
            alert("获取数据时产生未知异常"+xhr.message);
        }
    })
}