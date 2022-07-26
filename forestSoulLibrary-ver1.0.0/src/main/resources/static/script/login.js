$(function (){
    $("#exampleInputUser1").blur(checkAcct);
    $("#exampleInputPassword1").blur(checkPw);



    $("#login-form-sub").click(function (){
        let flag = true;
        if (!checkAcct()) flag = false;
        if (!checkPw()) flag = false;

        if (flag){
            $.ajax({
                url:"/customer/login",
                type:"POST",
                data:$("#login").serialize(),
                dataType:"JSON",
                success:function (json){
                    if (json.state === 200){
                        location.href="../index.html"
                    }else if (json.state === 5000){
                        $("#AcctErrorMsg").addClass("error").removeClass("OK").html("用户名不存在");
                    }else if (json.state === 5001){
                        $("#PwErrorMsg").addClass("error").removeClass("OK").html("密码错误");
                    }else {
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
})

function checkAcct(){
    const Acct = $("#exampleInputUser1").val().trim();
    const reg = /^[a-zA-Z]\w{3,15}$/;
    if(reg.test(Acct) === false){
        $("#AcctErrorMsg").addClass("error").removeClass("OK").html("必须以字母开头,允许字母数字下划线,4-16字");
        return false;
    }else {
        $("#AcctErrorMsg").addClass("OK").removeClass("error");
        return true;
    }
}

function checkPw(){
    const Pw = $("#exampleInputPassword1").val().trim();
    const reg = /^[a-zA-Z]\w{7,17}$/
    if(reg.test(Pw) === false){
        $("#PwErrorMsg").addClass("error").removeClass("OK").html("必须以字母开头,只能包含字母数字下划线,8-16字");
        return false;
    }else {
        $("#PwErrorMsg").addClass("OK").removeClass("error");
        return true;
    }
}

