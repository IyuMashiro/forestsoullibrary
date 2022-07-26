$(function (){
    $("#InputAcct").blur(checkAcct);
    $("#InputPassword").blur(checkPw);



    $("#adminLogin-form-sub").click(function (){
        let flag = true;
        if (!checkAcct()) flag = false;
        if (!checkPw()) flag = false;

        if (flag){
            $.ajax({
                url:"/admin/login",
                type:"POST",
                data:$("#login-form").serialize(),
                dataType:"JSON",
                success:function (json){
                    if (json.state === 200){
                        location.href="../web/libraryManageSystem.html"
                    }else if (json.state === 5007){
                        $("#AcctErrorMsg").addClass("error").removeClass("OK").html("管理员账户不存在");
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
    const Acct = $("#InputAcct").val().trim();
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
    const Pw = $("#InputPassword").val().trim();
    const reg = /^[a-zA-Z]\w{7,17}$/
    if(reg.test(Pw) === false){
        $("#PwErrorMsg").addClass("error").removeClass("OK").html("必须以字母开头,只能包含字母数字下划线,8-16字");
        return false;
    }else {
        $("#PwErrorMsg").addClass("OK").removeClass("error");
        return true;
    }
}

