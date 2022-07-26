$(function () {

    CustomerInitPagination();
    CustomerPageSelectCallback(0);

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

    $("#customer-btn").click(function (){
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
        CustomerInitPagination();
        CustomerPageSelectCallback(0);
    })

})



function CustomerInitPagination() {
    //获取记录数
    $.ajax({
        url:"/customer/getPage",
        type:"GET",
        data:$("#customer-search").serialize(),
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
                    callback:CustomerPageSelectCallback,
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
            return false;
        },
        error:function (xhr){
            alert("获取数据发生未知异常"+xhr.message)
        }
    })


}

function CustomerPageSelectCallback(pageIndex) {
    let pageNum = pageIndex + 1;
    $.ajax({
        url:"/customer/getPage",
        type:"GET",
        data:"pageNum="+pageNum+"&"+$("#customer-search").serialize(),
        dataType:"JSON",
        success:function (json){
            if (json.state === 200){
                let list = json.data.list

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

                for (let i = 0;i < list.length;i++) {
                    let tr =
                        "<tr>\n" +
                        "    <td>" + list[i].customerId + "</td>\n" +
                        "    <td>" + list[i].customerLogin + "</td>\n" +
                        "    <td>" + list[i].customerName + "</td>\n" +
                        "    <td>" + list[i].customerPassword + "</td>\n" +
                        "    <td>" + list[i].customerEmail + "</td>\n" +
                        "    <td>" + list[i].customerDate + "</td>\n" +
                        "    <td>\n" +
                        "        <button type=\"button\" id='#{id}' class=\"btn btn-info LMS-main-edit\"><img class=\"LMS-main-icon\" src=\"../fonts/配置.svg\"></button>\n" +
                        "        <button type=\"button\" class=\"btn btn-danger LMS-main-remove\"><img class=\"LMS-main-icon\" src=\"../fonts/删除.svg\"></button>\n" +
                        "    </td>\n"
                    tr = tr.replace(/#{id}/g,list[i].customerId );
                    $("#LMS-tb").append(tr);
                }
            }else {
                alert("获取数据失败")
            }
            return false;
        },
        error:function (xhr){
            alert("获取数据发生未知异常"+xhr.message)
        }
    })

    $(document).on("click",".LMS-main-edit",function () {
        let id = $(this).attr("id");
        location.href="../web/role-update.html?id="+id;
    })

    $(document).on("click",".LMS-main-remove",function () {
        let id = $(this).prev().attr("id");
        $.ajax({
            url:"/customer/delete",
            type:"GET",
            data:"id="+id,
            dataType:"JSON",
            success:function (json){
                if (json.state == 200){
                    location.href="../web/admin-cus-page.html"
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

