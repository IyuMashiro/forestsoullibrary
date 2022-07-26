$(function () {
    //页码导航条初始化
    initPagination();
    $("#customer-bar").click(function (){
        $("#pagination").empty();
        CustomerInitPagination();

    });

    $("#admin-bar").click(function (){
        $("#pagination").empty();
        initPagination();

    })

    $("#admin-btn").on("click",function (){
        $("#pagination").empty();
        initPagination();
        pageSelectCallback(0);

    })
    $("#customer-btn").on("click",function (){
        $("#pagination").empty();
        CustomerInitPagination()
        CustomerPageSelectCallback(0);

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
        url:"/admin/getPage",
        type:"GET",
        data:"pageNum="+pageNum+"&"+$("#admin-search").serialize(),
        dataType:"JSON",
        success:function (json){
            if (json.state === 200){
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
                for (let i = 0;i < list.length;i++){
                    let tr =
                        "<tr>\n" +
                        "    <td>"+list[i].id+"</td>\n" +
                        "    <td>"+list[i].loginAcct+"</td>\n" +
                        "    <td>"+list[i].name+"</td>\n" +
                        "    <td>"+list[i].password+"</td>\n" +
                        "    <td>"+list[i].create_date+"</td>\n" +
                        "    <td>#{leven}</td>\n" +
                        "    <td>\n" +
                        "        <button type=\"button\" class=\"btn btn-success\"><img class=\"LMS-main-icon\" src=\"../fonts/完成.svg\"></button>\n" +
                        "        <button type=\"button\" class=\"btn btn-info LMS-main-edit\"><img class=\"LMS-main-icon\" src=\"../fonts/配置.svg\"></button>\n" +
                        "        <button type=\"button\" class=\"btn btn-danger LMS-main-remove\"><img class=\"LMS-main-icon\" src=\"../fonts/删除.svg\"></button>\n" +
                        "    </td>\n" +
                        "</tr>"
                    if (list[i].leven === 1){
                        tr = tr.replace(/#{leven}/g,"超级管理员");
                    }else {
                        tr = tr.replace(/#{leven}/g,"普通管理员");
                    }
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

}

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
        url:"/admin/getPage",
        type:"GET",
        data:"pageNum="+pageNum+"&"+$("#customer-search").serialize(),
        dataType:"JSON",
        success:function (json){
            if (json.state === 200){
                let list = json.data
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
                        "        <button type=\"button\" class=\"btn btn-info LMS-main-edit\"><img class=\"LMS-main-icon\" src=\"../fonts/配置.svg\"></button>\n" +
                        "        <button type=\"button\" class=\"btn btn-danger LMS-main-remove\"><img class=\"LMS-main-icon\" src=\"../fonts/删除.svg\"></button>\n" +
                        "    </td>\n"
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

}

