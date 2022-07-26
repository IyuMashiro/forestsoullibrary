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

    $(document).on("click",".LMS-main-edit",function (){
        let id = $(this).next().next().val();
        location.href="../web/indent-update.html?indentId="+id;
    })

    $(document).on("click",".pay",function (){
        let id = $(this).next().next().next().val();
        $.ajax({
            url:"/indent/updateState",
            type:"POST",
            data:"indentId="+id+"&state="+1,
            dataType:"JSON",
            success:function (json) {
              location.href="../web/indent-page.html"
            },
            error:function (xhr){

            }
        })
    })

    $(document).on("click",".send",function (){
        let id = $(this).next().next().next().val();
        $.ajax({
            url:"/indent/updateState",
            type:"POST",
            data:"indentId="+id+"&state="+2,
            dataType:"JSON",
            success:function (json) {
                location.href="../web/indent-page.html"
            },
            error:function (xhr){

            }
        })
    })

    $(document).on("click",".complete",function (){
        let id = $(this).next().next().next().val();
        $.ajax({
            url:"/indent/updateState",
            type:"POST",
            data:"indentId="+id+"&state="+3,
            dataType:"JSON",
            success:function (json) {
                location.href="../web/indent-page.html"
            },
            error:function (xhr){

            }
        })
    })

    $(document).on("click",".LMS-main-remove",function (){
        let id = $(this).next().val();
        $.ajax({
            url:"/indent/delete",
            type:"POST",
            data:"indentId="+id,
            dataType:"JSON",
            success:function (json) {
                location.href="../web/indent-page.html"
            },
            error:function (xhr){

            }
        })
    })

})

function initPagination() {
    //获取记录数
    $.ajax({
        url:"/indent/getInfoAll",
        type:"GET",
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
        url: "/indent/getInfoAll",
        type: "GET",
        data: "pageNum=" + pageNum,
        dataType: "JSON",
        success: function (json) {
            if (json.state === 200) {
                let list = json.data.list
                console.log(list)
                $("#indent").empty();
                for (let i = 0; i < list.length; i++) {
                    let tr =
                       " <tr>\n" +
                        "   <td>"+list[i].indentId+"</td>\n" +
                        "   <td>"+list[i].indentName+"</td>\n" +
                        "   <td>"+list[i].indentAddress+"</td>\n" +
                        "   <td>"+list[i].indentPhone+"</td>\n" +
                        "   <td>"+list[i].indentPrice+"</td>\n" +
                        "   <td>"+list[i].indentDate+"</td>\n" +
                        "   <td>#{state}</td>\n" +
                        "   <td>\n" +
                        "     #{tag}" +
                        "      <button type=\"button\" class=\"btn btn-info LMS-main-edit\"><img class=\"LMS-main-icon\" src=\"../fonts/配置.svg\"></button>\n" +
                        "      <button type=\"button\" class=\"btn btn-danger LMS-main-remove\"><img class=\"LMS-main-icon\" src=\"../fonts/删除.svg\"></button>\n" +
                        "      <input type='hidden' value='#{id}'>" +
                        "   </td>\n" +
                        "</tr>"
                    tr = tr.replace(/#{total}/g, list[i].indentPrice);
                    tr = tr.replace(/#{id}/g, list[i].indentId);
                    if (list[i].indentState === 0) {
                        let active =
                            " <button type=\"button\" class=\"btn btn-success pay\">已付款</button>\n"
                        tr = tr.replace(/#{tag}/g, active);
                        tr = tr.replace(/#{state}/g, "待付款");
                    } else if (list[i].indentState === 1) {
                        let active =
                            " <button type=\"button\" class=\"btn btn-success send\">已发货</button>\n"
                        tr = tr.replace(/#{tag}/g, active);
                        tr = tr.replace(/#{state}/g, "待发货");
                    } else if (list[i].indentState === 2) {
                        let active =
                            " <button type=\"button\" class=\"btn btn-success complete\">已完成</button>\n"
                        tr = tr.replace(/#{tag}/g, active);
                        tr = tr.replace(/#{state}/g, "待收货");
                    } else if (list[i].indentState === 3) {
                        let active =
                            " "
                        tr = tr.replace(/#{tag}/g, active);
                        tr = tr.replace(/#{state}/g, "已完成");

                    }
                    $("#indent").append(tr)
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
