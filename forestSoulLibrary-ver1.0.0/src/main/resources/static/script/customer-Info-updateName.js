$(function (){
    $("#inputName").blur(checkName);
    $("#inputEmail").blur(checkEmail);

    $("#head-sub").click(function (){
        let keyword = $("#head-input").val();
        location.href="../customerWeb/book-search.html?keyword="+keyword;
    })

    $.ajax({
        url:"/customer/getById",
        type:"POST",
        data:$("#from-updateName").serialize(),
        dataType:"JSON",
        success:function (json){
            if (json.state === 200){
                $("#inputName").val(json.data.customerName);
                $("#inputEmail").val(json.data.customerEmail);
                $("#customerName").html(json.data.customerName);
                $("#head-img").attr("src",json.data.customerIcon);
                $("#icon").attr("src",json.data.customerIcon)
            }else{
                alert("数据不存在")
            }
        },
        error:function (xhr){
            alert("更新时产生未知异常"+xhr.message);
        }
    })

    $("#file").on("click",function (){
        $(".kv-fileinput-upload").attr("type","button");
    })

    $(".kv-fileinput-upload").on("click",function (){
        let formData = new FormData();
        formData.append("file",$("#file")[0].files[0])
        $.ajax({
            url:"/customer/changeIcon",
            type:"POST",
            data: formData,
            processData:false,
            contentType:false,
            dataType:"JSON",
            success:function (json){
                if (json.state === 200){
                    $("#icon").attr("src",json.data)
                }else{
                    alert("失败")
                }
            },
            error:function (xhr){
                alert("更新时产生未知异常"+xhr.message);
            }
        })
    })

    $("#pw-updata").click(function (){
        let flag = true;
        if (!checkName()) flag = false;
        if (!checkEmail()) flag = false;

        if (flag){
            $.ajax({
                url:"/customer/changeInfo",
                type:"POST",
                data:$("#from-updateName").serialize(),
                dataType:"JSON",
                success:function (json){
                    if (json.state === 200){
                        location.href="customer-Info.html"
                    }else{
                        alert("失败")
                    }
                },
                error:function (xhr){
                    alert("更新时产生未知异常"+xhr.message);
                }
            })

            return false;
        }


    })


    $("#pw-cal").click(function (){
        location.href="customer-Info.html"
    })
})

function checkName(){
    const Name = $("#inputName").val().trim();
    const reg = /^[\u4E00-\u9FA5A-Za-z0-9_]{2,10}$/
    if(reg.test(Name) === false){
        $("#NameErrorMsg").addClass("error").removeClass("OK");
        return false;
    }else {
        $("#NameErrorMsg").addClass("OK").removeClass("error");
        return true;
    }
}

function checkEmail(){
    const Email = $("#inputEmail").val().trim();
    const reg = /^[A-Za-z0-9\-_]+[A-Za-z0-9\.\-_]*[A-Za-z0-9\-_]+@[A-Za-z0-9]+[A-Za-z0-9\.\-_]*(\.[A-Za-z0-9\.\-_]+)*[A-Za-z0-9]+\.[A-Za-z0-9]+[A-Za-z0-9\.\-_]*[A-Za-z0-9]+$/
    if(reg.test(Email) === false){
        $("#EmailErrorMsg").addClass("error").removeClass("OK");
        return false;
    }else {
        $("#EmailErrorMsg").addClass("OK").removeClass("error");
        return true;
    }
}