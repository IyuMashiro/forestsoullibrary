$(function () {
    $.ajax({
        url:"/admin/getData",
        type:"POST",
        data:$("#login-form").serialize(),
        dataType:"JSON",
        success:function (json){
            if (json.state === 200){
                $("#admin-acct").html(json.data.loginAcct)
            }else {
                alert("获取数据失败")
            }
        },
        error:function (xhr){
            alert("获取数据时产生未知异常"+xhr.message);
        }
    })

    $("#logout").click(function (){
        $.ajax({
            url:"/admin/logout",
            type:"POST",
            dataType:"JSON",
            success:function (json){
                if (json.state === 200){
                    location.href="../web/admin-login.html";
                }else {
                    alert("获取数据失败")
                }
            },
            error:function (xhr){

            }
        })
    })

    $.ajax({
        url:"/recommend/book",
        type:"GET",
        dataType:"JSON",
        success:function (json) {
                let list = json.data
                for (let i = 0;i < list.length;i++){
                    let tr =
                        " <tr>\n" +
                        "   <td>"+list[i].bookId+"</td>\n" +
                        "   <td>"+list[i].bookName+"</td>\n" +
                        "   <td><img class=\"book-img\" src=\"#{img}\"/></td>\n" +
                        "   <td>￥"+list[i].bookPrice+"</td>\n" +
                        "   <td>"+list[i].bookAuthor+"</td>\n" +
                        "   <td>\n" +
                        "     <button type=\"button\" id='#{id}' class=\"btn btn-danger LMS-main-remove\"><img class=\"LMS-main-icon\" src=\"../fonts/删除.svg\"></button>\n" +
                        "    </td>\n" +
                        " </tr>"
                    tr = tr.replace(/#{id}/g, list[i].bookId);
                    tr = tr.replace(/#{img}/g, list[i].bookImg);
                    $("#recommend").append(tr);
                }
        },
        error:function (xhr){

        }
    })

    $(document).on("click",".LMS-main-remove",function (){
        let id = $(this).attr("id")
        $.ajax({
            url:"/recommend/delete",
            type:"GET",
            data:"bookId="+id,
            dataType:"JSON",
            success:function (json){
                if (json.state === 200){
                    location.href="../web/recomment-page.html"
                }else {
                    alert("出现未知异常")
                }

            },
            error:function (xhr) {
                alert("出现未知异常"+xhr.message)
            }
        })
    })
})