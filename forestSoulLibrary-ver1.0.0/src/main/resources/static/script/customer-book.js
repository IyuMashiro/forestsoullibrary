$(function () {
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
                    "            <li><a href=\"/customerWeb/customer-Info.html\">个人主页</a></li>\n" +
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

})

function initPagination() {
    //获取记录数
    $.ajax({
        url:"/pdf/getPage",
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
        url: "/pdf/getPage",
        type: "GET",
        data: "pageNum=" + pageNum ,
        dataType: "JSON",
        success: function (json) {
            if (json.state === 200) {
                let list = json.data.list
                console.log(list)

                let length
                if (list.length !== 2){
                    length = list.length
                }else {
                    length = list.length-1;
                }
                $("#my-book-two").empty();
                for (let i = 0; i < length; i++) {
                    let bookId = list[i].bookId;
                    $.ajax({
                        url:"/book/info",
                        type:"GET",
                        data: "bookId="+bookId,
                        dataType:"JSON",
                        success:function (json){
                            if (json.state === 200){
                                let tr =
                                    " <img src=\"#{bookImg}\">\n" +
                                    " <p class=\"book-name\">"+json.data.bookName+"</p>\n" +
                                    " <p class=\"book-author\">"+json.data.bookAuthor+"</p>\n" +
                                    " <a href=\"#{url}\" class=\"read\">在线阅读</a>"
                                tr = tr.replace(/#{bookImg}/g, json.data.bookImg);
                                tr = tr.replace(/#{url}/g, json.data.bookPdf);

                                $("#my-book-two").append(tr);

                            }else {
                                alert("获取数据失败")
                            }
                        },
                        error:function (xhr){
                            alert("获取数据发生未知异常"+xhr.message)
                        }
                    })

                }
                $("#my-book-three").empty();
                for (let i = 1; i < list.length; i++) {
                    let bookId = list[i].bookId;
                    $.ajax({
                        url:"/book/info",
                        type:"GET",
                        data: "bookId="+bookId,
                        dataType:"JSON",
                        success:function (json){
                            if (json.state === 200){
                                let tr =
                                    " <img src=\"#{bookImg}\">\n" +
                                    " <p class=\"book-name\">"+json.data.bookName+"</p>\n" +
                                    " <p class=\"book-author\">"+json.data.bookAuthor+"</p>\n" +
                                    " <a href=\"#{url}\" class=\"read\">在线阅读</a>"
                                tr = tr.replace(/#{bookImg}/g, json.data.bookImg);
                                tr = tr.replace(/#{url}/g, json.data.bookPdf);

                                $("#my-book-three").append(tr);

                            }else {
                                alert("获取数据失败")
                            }
                        },
                        error:function (xhr){
                            alert("获取数据发生未知异常"+xhr.message)
                        }
                    })
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
