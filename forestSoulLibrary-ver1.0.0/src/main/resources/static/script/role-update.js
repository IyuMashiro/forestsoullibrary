$(function () {
    $(function (){
        let id = $.getUrlParam("id");
        $("#register-form-sub").click(function (){
            $.ajax({
                url:"/customer/update",
                type:"POST",
                data:"id="+id+"&"+$("#form").serialize(),
                dataType:"JSON",
                success:function (json){
                    if (json.state === 200){
                        location.href = "../web/libraryManageSystem.html"
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
})