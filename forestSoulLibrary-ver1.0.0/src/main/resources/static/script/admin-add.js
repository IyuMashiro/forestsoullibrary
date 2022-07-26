$(function (){
    $("#register-form-sub").click(function (){
        $.ajax({
            url:"/admin/add",
            type:"POST",
            data:$("#form").serialize(),
            dataType:"JSON",
            success:function (json){
                if (json.state === 200){
                    location.href = "../web/admin-ad-page.html"
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