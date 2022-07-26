$(function(){
    $("#exampleInputUser1").blur(checkAcct);
    $("#exampleInputUser2").blur(checkName);
    $("#exampleInputPassword1").blur(checkPw);
    $("#exampleInputPassword2").blur(checkRePw);

    $("#register-form-sub").click(function(){
        let flag = true;
        if (!checkAcct()) flag = false;
        if (!checkName()) flag = false;
        if (!checkPw()) flag = false;
        if (!checkRePw()) flag = false;

        if (flag){
            $.ajax({
                url:"/customer/reg",
                type:"POST",
                data:$("#form-reg").serialize(),
                dataType:"JSON",
                success:function (json){
                    if (json.state  === 200){
                        location.href="../web/login.html"
                    }else {
                        alert("fail");
                    }
                },
                error:function (xhr){
                    alert("error"+xhr.status);
                }
            })
        }

        return flag;
    })


})

function checkAcct(){
    const Acct = $("#exampleInputUser1").val().trim();
    const reg = /^[a-zA-Z]\w{3,15}$/;
    if(reg.test(Acct) === false){
        $("#AcctErrorMsg").html("必须以字母开头,允许字母数字下划线,4-16字");
        return false;
    }else {
        $("#AcctErrorMsg").html("");
        $.ajax({
            url: "/customer/selectByLogin",
            type: "GET",
            data: $("#form-reg").serialize(),
            dataType: "JSON",
            success:function (json){
                if (json.state === 5000){
                    $("#AcctErrorMsg").html("用户已被注册")
                    return false;
                }else if (json.state === 200){
                    $("#AcctErrorMsg").html("可用")
                    return true;
                }
            },
            error:function (xhr){
                alert("error"+xhr.status);
            }
        })
        return true;
    }
}

function checkName(){
    const Name = $("#exampleInputUser2").val().trim();
    const reg = /^[\u4E00-\u9FA5A-Za-z0-9_]{2,10}$/
    if(reg.test(Name) === false){
        $("#NameErrorMsg").addClass("error").removeClass("OK");
        return false;
    }else {
        $("#NameErrorMsg").addClass("OK").removeClass("error");
        return true;
    }
}

function checkPw(){
    const Pw = $("#exampleInputPassword1").val().trim();
    const reg = /^[a-zA-Z]\w{7,17}$/
    if(reg.test(Pw) === false){
        $("#PwErrorMsg").addClass("error").removeClass("OK");
        return false;
    }else {
        $("#PwErrorMsg").addClass("OK").removeClass("error");
        return true;
    }
}

function checkRePw(){
    const Pw = $("#exampleInputPassword1").val().trim();
    const RePw = $("#exampleInputPassword2").val().trim();
    if(Pw !== RePw){
        $("#RePwErrorMsg").addClass("error").removeClass("OK");
        return false;
    }else {
        $("#RePwErrorMsg").addClass("OK").removeClass("error");
        return true;
    }
}

