$(function () {
    initPagination();
    pageSelectCallback(0)

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

    $("#LMS-main-add").click(function (){
      location.href="../web/book-add.html"
    })

    $(document).on("click",".LMS-main-edit",function (){
        let id = $(this).prev().val()
        location.href="../web/book-update.html?bookId="+id
    })

    $(document).on("click",".LMS-main-remove",function (){
        let id = $(this).prev().prev().val()
        $.ajax({
            url:"/book/delete",
            type:"GET",
            data:"id="+id,
            dataType:"JSON",
            success:function (json){
                if (json.state == 200){
                    location.href="../web/book-page.html"
                }else {
                    alert("出现未知异常")
                }

            },
            error:function (xhr) {
                alert("出现未知异常"+xhr.message)
            }
        })
    })


    $(document).on("click",".LMS-main-calRecommend",function (){
        let id = $(this).prev().prev().prev().val()
        $.ajax({
            url:"/recommend/delete",
            type:"GET",
            data:"bookId="+id,
            dataType:"JSON",
            success:function (json){
                if (json.state == 200){
                    location.href="../web/book-page.html"
                }else {
                    alert("出现未知异常")
                }

            },
            error:function (xhr) {
                alert("出现未知异常"+xhr.message)
            }
        })
    })

    $(document).on("click",".LMS-main-Recommend",function (){
        let id = $(this).prev().prev().prev().val()
        $.ajax({
            url:"/recommend/add",
            type:"GET",
            data:"bookId="+id,
            dataType:"JSON",
            success:function (json){
                if (json.state == 200){
                    location.href="../web/book-page.html"
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

function initPagination() {
    //获取记录数
    $.ajax({
        url:"/book/getPage",
        type:"GET",
        data:$("#bookSearch").serialize(),
        dataType:"JSON",
        success:function (json){
            if (json.state === 200){
                console.log(json.data)
                let totalRecord = json.data.total;
                let pageSize = json.data.pageSize;
                let pageNums = json.data.pageNum;
                let properties = {
                    num_edge_entries: 3,
                    num_display_entries: 4,
                    callback:pageSelectCallback,
                    items_per_page:pageSize,
                    current_page:pageNums-1,
                    prev_text: "上一页",
                    next_text: "下一页"
                };
                //生成页码导航条
                $("#pagination").pagination(totalRecord,properties);
            }else {
                alert("获取数据失败")
            }
        },
        error:function (xhr){
            alert("获取数据发生未知异常"+xhr.message)
        }
    })
}

function pageSelectCallback(pageIndex) {
    let pageNum = pageIndex + 1;
    $.ajax({
        url: "/book/getPage",
        type: "GET",
        async:false,
        data: "pageNum=" + pageNum + "&",
        dataType: "JSON",
        success: function (json) {
            if (json.state === 200) {
                let list = json.data.list
                console.log(list)
                $("#book").empty();
                for (let i = 0; i < list.length; i++) {
                    let tr =
                        " <tr>\n" +
                        "   <td>"+list[i].bookId+"</td>\n" +
                        "   <td>"+list[i].bookName+"</td>\n" +
                        "   <td><img class=\"book-img\" src=\"#{img}\"/></td>\n" +
                        "   <td>￥"+list[i].bookPrice+"</td>\n" +
                        "   <td>"+list[i].bookAuthor+"</td>\n" +
                        "   <td>"+list[i].bookSales+"</td>\n" +
                        "   <td>"+list[i].bookInventory+"</td>\n" +
                        "   <td>"+list[i].bookType+"</td>\n" +
                        "   <td>#{date}</td>\n" +
                        "   <td>\n" +
                        "       <input type='hidden' value='#{id}'>" +
                        "       <button type=\"button\" class=\"btn btn-info LMS-main-edit\"><img class=\"LMS-main-icon\" src=\"../fonts/配置.svg\"></button>\n" +
                        "       <button type=\"button\" class=\"btn btn-danger LMS-main-remove\"><img class=\"LMS-main-icon\" src=\"../fonts/删除.svg\"></button>\n" +
                        "       #{tag}" +
                        "   </td>\n" +
                        " </tr>"

                    let bookId = list[i].bookId

                    $.ajax({
                        url:"/recommend/count",
                        type:"GET",
                        async:false,
                        dataType:"JSON",
                        success:function (json) {
                            if (json.state === 200){
                                if (json.data === 10){
                                        $.ajax({
                                            url:"/recommend/getId",
                                            type:"GET",
                                            data:"bookId="+bookId,
                                            async:false,
                                            dataType:"JSON",
                                            success:function (json) {
                                                if (json.state === 200){
                                                    let tag =
                                                        "<button type=\"button\" class=\"btn btn-primary LMS-main-calRecommend\">取消推荐</button>\n"
                                                    tr = tr.replace(/#{tag}/g, tag);
                                                }else {
                                                    tr = tr.replace(/#{tag}/g, "");
                                                }
                                            },
                                            error:function (xhr) {
                                                alert("发生未知异常"+xhr.message)
                                            }
                                        })

                                }else {
                                    $.ajax({
                                        url:"/recommend/getId",
                                        type:"GET",
                                        data:"bookId="+bookId,
                                        async:false,
                                        dataType:"JSON",
                                        success:function (json) {
                                            if (json.state === 200){
                                                let tag =
                                                    "<button type=\"button\" class=\"btn btn-primary LMS-main-calRecommend\">取消推荐</button>\n"
                                                tr = tr.replace(/#{tag}/g, tag);
                                            }else {
                                                let tag =
                                                    "<button type=\"button\" class=\"btn btn-primary LMS-main-Recommend\">今天推荐</button>\n"
                                                tr = tr.replace(/#{tag}/g, tag);
                                            }
                                        },
                                        error:function (xhr) {
                                            alert("发生未知异常"+xhr.message)
                                        }
                                    })
                                }
                            }else {
                                alert("发生未知异常")
                            }
                        },
                        error:function (xhr) {
                            alert("发生未知异常"+xhr.message)
                        }
                    })

                    let BookDate = list[i].bookDate
                    tr = tr.replace(/#{img}/g, list[i].bookImg);
                    tr = tr.replace(/#{date}/g, BookDate.slice(0,10));
                    tr = tr.replace(/#{id}/g, list[i].bookId);
                    $("#book").append(tr);
                }
            } else {
                alert("获取数据失败")
            }
            return false;
        },
        error: function (xhr) {
            alert("获取数据发生未知异常" + xhr.message)
        }
    })
}
