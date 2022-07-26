$(function (){
    let id = $.getUrlParam("id");
    $("#register-form-sub").click(function (){
        $.ajax({
            url:"/admin/update",
            type:"POST",
            data:"id="+id+"&"+$("#form").serialize(),
            dataType:"JSON",
            success:function (json){
                if (json.state === 200){
                    location.href = "../web/admin-login.html"
                }else {
                    alert("出现未知异常")
                }
            },
            error:function (xhr){
                alert("出现未知异常"+xhr.message)
            }
        })
    })
})