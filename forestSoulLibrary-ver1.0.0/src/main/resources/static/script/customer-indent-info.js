$(function (){
    initPagination();
    pageSelectCallback(0);
    $.ajax({
    url:"/customer/getById",
    type:"POST",
    dataType:"JSON",
    success:function (json){
        if (json.state === 200){
            let tr =
                " <li class=\"dropdown\">\n" +
                "          <a href=\"#\" id=\"customerName\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">"+json.data.customerName+"<span class=\"caret\"></span></a>\n" +
                "          <ul class=\"dropdown-menu\">\n" +
                "            <li><a href=\"customer-Info.html\">个人主页</a></li>\n" +
                "            <li><a href=\"/customer/logout\">注销</a></li>\n" +
                "          </ul>\n" +
                "        </li>\n" +
                "        <img id=\"head-img\" src=\"#{img}\">"
            tr = tr.replace(/#{img}/g, json.data.customerIcon);
            $("#noLogin").hide();
            $("#login-bar").append(tr);
        }else if (json.state() === 5010){
        }else {
            alert("未知异常")
        }
    },
    error:function (xhr){
        alert("获取数据时产生未知异常"+xhr.message);
    }
})

    $(document).on("click",".pay",function (){
        let id = $(this).prev().prev().prev(".id").val()
        let count = $(this).prev().prev(".bookCount").val()
        let total = $(this).prev(".total").val()
        location.href="../customerWeb/pay.html?indentId="+id+"&bookCount="+count+"&bookPrice="+total
    })

    $(document).on("click",".calPay",function (){
        let id = $(this).prev().prev().prev().prev(".id").val()
        let count = $(this).prev().prev(".bookCount").val()
        let total = $(this).prev(".total").val()
        $.ajax({
            url:"/indent/updateState",
            type:"GET",
            data: "indentId="+id+"&state="+-1,
            dataType:"JSON",
            success:function (json){
                if (json.state === 200){
                    location.href="../customerWeb/customer-indent-info.html"
                }else {
                    alert("获取数据失败")
                }
            },
            error:function (xhr){
                alert("获取数据发生未知异常"+xhr.message)
            }
        })

    })

    $(document).on("click",".confirm",function (){
        let id = $(this).prev().prev().prev(".id").val()
        $.ajax({
            url:"/indent/updateState",
            type:"GET",
            data: "indentId="+id+"&state="+3,
            dataType:"JSON",
            success:function (json){
                if (json.state === 200){
                    location.href="../customerWeb/customer-indent-info.html"
                }else {
                    alert("获取数据失败")
                }
            },
            error:function (xhr){
                alert("获取数据发生未知异常"+xhr.message)
            }
        })

    })


})

function initPagination() {
    //获取记录数
    $.ajax({
        url:"/indent/getInfo",
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
        url: "/indent/getInfo",
        type: "GET",
        data: "pageNum=" + pageNum,
        dataType: "JSON",
        success: function (json) {
            if (json.state === 200) {
                let list = json.data.list
                console.log(list)
                $("#indent").empty();
                for (let i = 0;i<list.length;i++){
                    let tr =
                        " <div class=\"user-main\">\n" +
                        "                <form>\n" +
                        "                    <div class=\"order\">\n" +
                        "                        <img class=\"img\" src=\"../bookImg/default.jpg\">\n" +
                        "                        <div class=\"book-name\">森灵订单</div>\n" +
                        "                        <div class=\"row order-form\">\n" +
                        "                            <p>订单编号:<span class=\"indentId\">"+list[i].indentId+"</span></p>\n" +
                        "                            <p>下单时间: <span class=\"date\">"+list[i].indentDate+"</span></p>\n" +
                        "                            <p>总计金额: <span class=\"totalPrice\">"+list[i].indentPrice+"</span></p>\n" +
                        "                        </div>\n" +
                        "                        <span class=\"state\">#{tag}</span>\n" +
                        "                            <input type='hidden' class='id'value='#{id}'>" +
                        "                            <input type='hidden' class='bookCount'value='1'>" +
                        "                            <input type='hidden' class='total'value='#{total}'>" +
                        "                        #{active}\n" +
                        "                    </div>\n" +
                        "                </form>\n" +
                        "        </div>"

                    tr = tr.replace(/#{total}/g,list[i].indentPrice);
                    tr = tr.replace(/#{id}/g,list[i].indentId);
                    if (list[i].indentState === 0){
                        let active =
                            "<button type=\"button\" class=\"btn btn-default pw-but apply-refung pay\">立即支付</button>\n" +
                            "<button type=\"button\" class=\"btn btn-default pw-but cancel-pay calPay\">取消订单</button>"
                        tr = tr.replace(/#{tag}/g,"待付款");
                        tr = tr.replace(/#{active}/g,active);
                    }else if (list[i].indentState === 1){
                        tr = tr.replace(/#{tag}/g,"待发货");
                        tr = tr.replace(/#{active}/g,"");
                    }else if (list[i].indentState === 2){
                        let active =
                            "<button type=\"button\" class=\"btn btn-default pw-but apply-refung confirm\">确认收货</button>"
                        tr = tr.replace(/#{tag}/g,"待收货");
                        tr = tr.replace(/#{active}/g,active);
                    }else if (list[i].indentState === 3){
                        tr = tr.replace(/#{tag}/g,"已完成");
                        tr = tr.replace(/#{active}/g,"");
                    }else if(list[i].indentState === -1){
                        tr = ""
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