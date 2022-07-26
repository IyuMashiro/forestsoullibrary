$(function (){
    $("#exampleInputPassword1").blur(checkOldPw);
    $("#exampleInputPassword2").blur(checkNewPw);
    $("#exampleInputPassword3").blur(checkReNewPw);

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

    $("#updata").click(function (){
        let flag = true;
        if (!checkOldPw()) flag = false;
        if (!checkNewPw()) flag = false;
        if (!checkReNewPw()) flag = false;

        if (flag){
            $.ajax({
                url:"/customer/changePassword",
                type:"POST",
                data:$("#from-changePw").serialize(),
                dataType:"JSON",
                success:function (json){
                    if (json.state === 200){
                        location.href="../web/login.html"
                    }else if (json.state === 5001){
                        $("#OldPwErrorMsg").addClass("error").removeClass("OK").html("密码错误");
                    }else if(json.state === 5002){
                        alert("更新产生未知错误")
                    }else{
                        alert("未知错误")
                    }
                },
                error:function (xhr){
                    alert("登录时产生未知异常"+xhr.message);
                }
            });
        }
        return flag;
    })

    $("#cal").click(function (){
        location.href="customer-Info.html"
    })
})

function checkOldPw() {
    const Pw = $("#exampleInputPassword1").val().trim();
    const reg = /^[a-zA-Z]\w{7,17}$/
    if(reg.test(Pw) === false){
        $("#OldPwErrorMsg").addClass("error").removeClass("OK").html("必须以字母开头,只能包含字母数字下划线,8-16字");
        return false;
    }else {
        $("#OldPwErrorMsg").addClass("OK").removeClass("error");
        return true;
    }
}

function checkNewPw(){
    const OldPw = $("#exampleInputPassword1").val().trim();
    const Pw = $("#exampleInputPassword2").val().trim();
    const reg = /^[a-zA-Z]\w{7,17}$/
    if(reg.test(Pw) === false){
        $("#PwErrorMsg").addClass("error").removeClass("OK").html("必须以字母开头,只能包含字母数字下划线,8-16字");
        return false;
    }else if(OldPw === Pw){
        $("#PwErrorMsg").addClass("error").removeClass("OK").html("不可以与原密码相同");
    }else{
        $("#PwErrorMsg").addClass("OK").removeClass("error");
        return true;
    }
}

function checkReNewPw(){

    const Pw = $("#exampleInputPassword2").val().trim();
    const RePw = $("#exampleInputPassword3").val().trim();
    if(Pw !== RePw){
        $("#RePwErrorMsg").addClass("error").removeClass("OK").html("两次密码不一致");
        return false;
    }else {
        $("#RePwErrorMsg").addClass("OK").removeClass("error");
        return true;
    }
}