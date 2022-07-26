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

    $("#admin-btn").on("click",function (){
        $("#pagination").empty();
        initPagination();
        pageSelectCallback(0);
    })

    $("#customer-bar").click(function (){
        let tr =
            " <tr id=\"LMS-tb-head\">\n" +
            "    <th>id</th>\n" +
            "    <th>账号名</th>\n" +
            "    <th>用户名</th>\n" +
            "    <th>密码</th>\n" +
            "    <th>电子邮件</th>\n" +
            "    <th>注册时间</th>\n" +
            "    <th>操作</th>\n" +
            " </tr>"
        $("#LMS-tb").empty().append(tr);
        showCustomerData()
    })


})

function initPagination() {
    //获取记录数
    $.ajax({
        url:"/admin/getPage",
        type:"GET",
        data:$("#admin-search").serialize(),
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
        url: "/admin/getPage",
        type: "GET",
        data: "pageNum=" + pageNum + "&" + $("#admin-search").serialize(),
        dataType: "JSON",
        success: function (json) {
            if (json.state === 200) {
                let tr =
                    " <tr id=\"LMS-tb-head\">\n" +
                    "    <th>id</th>\n" +
                    "    <th>账号名</th>\n" +
                    "    <th>用户名</th>\n" +
                    "    <th>密码</th>\n" +
                    "    <th>注册时间</th>\n" +
                    "    <th>权限等级</th>\n" +
                    "    <th>操作</th>\n" +
                    " </tr>"
                $("#LMS-tb").empty().append(tr);
                let list = json.data.list
                for (let i = 0; i < list.length; i++) {
                    let tr =
                        "<tr>\n" +
                        "    <td>" + list[i].id + "</td>\n" +
                        "    <td>" + list[i].loginAcct + "</td>\n" +
                        "    <td>" + list[i].name + "</td>\n" +
                        "    <td>" + list[i].password + "</td>\n" +
                        "    <td>" + list[i].create_date + "</td>\n" +
                        "    <td>#{leven}</td>\n" +
                        "    <td>\n" +
                        "        #{active}" +
                        "    </td>\n" +
                        "</tr>"

                    let rootTr =
                        "        <button type=\"button\" id='#{id}' class=\"btn btn-info LMS-main-edit\"><img class=\"LMS-main-icon\" src=\"../fonts/配置.svg\"></button>\n"
                    let adTr =
                        "        <button type=\"button\" id='#{id}' class=\"btn btn-info LMS-main-edit\"><img class=\"LMS-main-icon\" src=\"../fonts/配置.svg\"></button>\n" +
                        "        <button type=\"button\" class=\"btn btn-danger LMS-main-remove\"><img class=\"LMS-main-icon\" src=\"../fonts/删除.svg\"></button>\n"
                    if (list[i].leven === 1) {
                        tr = tr.replace(/#{leven}/g, "超级管理员");
                        tr = tr.replace(/#{active}/g, rootTr);
                        tr = tr.replace(/#{id}/g, list[i].id );
                    } else {
                        tr = tr.replace(/#{leven}/g, "普通管理员");
                        tr = tr.replace(/#{active}/g, adTr);
                        tr = tr.replace(/#{id}/g, list[i].id );
                    }
                    $("#LMS-tb").append(tr);
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

    $(document).on("click",".LMS-main-edit",function (){
        let id = $(this).attr("id");
        location.href="admin-ad-update.html?id="+id
    })

    $("#LMS-main-add").click(function () {
        location.href="../web/admin-add.html"
    })

    $(document).on("click",".LMS-main-remove",function (){
        let id = $(this).prev().attr("id");
        $.ajax({
            url:"/admin/delete",
            type:"GET",
            data:"id="+id,
            dataType:"JSON",
            success:function (json){
                if (json.state == 200){
                    location.href="../web/admin-ad-page.html"
                }else {
                    alert("出现未知异常")
                }

            },
            error:function (xhr) {
                alert("出现未知异常"+xhr.message)
            }
        })

    })
}

