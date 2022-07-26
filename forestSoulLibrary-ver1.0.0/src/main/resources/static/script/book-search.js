$(document).ready(function(){


    let bookType = getUrlParam("bookType");
    let keyword = getUrlParam("keyword");
    let orderBy = getUrlParam("orderBy");

   if (bookType == null){
       if (keyword == null){
           initPagination();
           pageSelectCallback(0)
       }else {
           initPaginationByKeyword()
           pageSelectByKeywordCallback(0)
       }

   }else {
       if (keyword == null){
           initPaginationByType();
           pageSelectByTypeCallback(0);
       }else {
           initPaginationByTypeAndKeyword()
           pageSelectByTypeAndKeywordCallback(0);
       }

   }

   $(".orderBy").click(function () {
       let orderBy = $(this).attr("id");
       $("#orderByVal").val(orderBy);
       if (bookType == null){
           if (keyword == null){
               initPaginationOrderBy();
               pageSelectOrderByCallback(0)
           }else {
               initPaginationByKeywordOrderBy()
               pageSelectByKeywordOrderByCallback(0)
           }

       }else {
           if (keyword == null){
               initPaginationByTypeOrderBy();
               pageSelectByTypeOrderByCallback(0);
           }else {
               initPaginationByTypeAndKeywordOrderBy()
               pageSelectByTypeAndKeywordOrderByCallback(0);
           }

       }
   })

   $("#head-sub").click(function (){
       if (bookType == null){
           if (keyword == null){
               initPagination();
               pageSelectCallback(0)
           }else {
               initPaginationByKeyword()
               pageSelectByKeywordCallback(0)
           }

       }else {
           if (keyword == null){
               initPaginationByType();
               pageSelectByTypeCallback(0);
           }else {
               initPaginationByTypeAndKeyword()
               pageSelectByTypeAndKeywordCallback(0);
           }

       }
   })

    $(document).on("click",".book-part-two",function (){
        let bookId = $(this).children("input").val()
        location.href="../customerWeb/book-info.html?bookId="+bookId
    })


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

    $("#a-book").mouseenter(function(){
        $(this).css('background','rgba(223, 116, 74, 1)');
        $("#a-book>a").css('color','white');
    })
    $("#a-book").mouseleave(function(){
        $(this).css('background','rgba(254, 220, 210, 1)');
        $("#a-book>a").css('color','rgba(223, 116, 74, 1)');
    })
    $("#b-book,#second-book").mouseenter(function(){
        $("#b-book").css('background','rgba(223, 116, 74, 1)');
        $("#b-book>a").css('color','white');
        $("#second-book").show();
    })
    $("#b-book,#second-book").mouseleave(function(){
        $("#b-book").css('background','rgba(254, 220, 210, 1)');
        $("#b-book>a").css('color','rgba(223, 116, 74, 1)');
        $("#second-book").hide();
    })
    $("#c-book,#third-book").mouseenter(function(){
        $("#c-book").css('background','rgba(223, 116, 74, 1)');
        $("#c-book>a").css('color','white');
        $("#third-book").show();
    })
    $("#c-book,#third-book").mouseleave(function(){
        $("#c-book").css('background','rgba(254, 220, 210, 1)');
        $("#c-book>a").css('color','rgba(223, 116, 74, 1)');
        $("#third-book").hide();
    })
    $("#d-book,#fourthly-book").mouseenter(function(){
        $("#d-book").css('background','rgba(223, 116, 74, 1)');
        $("#d-book>a").css('color','white');
        $("#fourthly-book").show();
    })
    $("#d-book,#fourthly-book").mouseleave(function(){
        $("#d-book").css('background','rgba(254, 220, 210, 1)');
        $("#d-book>a").css('color','rgba(223, 116, 74, 1)');
        $("#fourthly-book").hide();
    })
    $("#zonhe").hover(function(){
        $(this).css('background','rgb(103, 206, 201)')
    },function(){
        $(this).css('background','rgba(191, 211, 210, 1)')
    })
    $("#xiaoshou").hover(function(){
        $(this).css('background','rgb(103, 206, 201)')
    },function(){
        $(this).css('background','rgba(191, 211, 210, 1)')
    })
    $("#jiage").hover(function(){
        $(this).css('background','rgb(103, 206, 201)')
    },function(){
        $(this).css('background','rgba(191, 211, 210, 1)')
    })
    $("#chuban").hover(function(){
        $(this).css('background','rgb(103, 206, 201)')
    },function(){
        $(this).css('background','rgba(191, 211, 210, 1)')
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
        data: "pageNum=" + pageNum + "&" + $("#head-input").serialize(),
        dataType: "JSON",
        success: function (json) {
            if (json.state === 200) {
                let list = json.data.list
                console.log(list)
                $("#one").empty();
                let length
                if (list.length !== 10){
                    length = list.length
                }else {
                    length = list.length-5;
                }
                for (let i = 0; i < length; i++) {
                    let tr =
                        "<span class=\"book-part-two\">\n" +
                        "                <input type='hidden' value='#{bookId}'>  " +
                        "                <img src=\"#{bookImg}\" class='img'>\n" +
                        "                <p class='price'>￥"+list[i].bookPrice+"</p>\n" +
                        "                <p class='name'>"+list[i].bookName+"</p>\n" +
                        "                <p class='author'>"+list[i].bookAuthor+"</p>\n" +
                        "                <p class='date'>#{date}</p>\n" +
                        "            </span>"
                    tr = tr.replace(/#{bookImg}/g, list[i].bookImg);
                    tr = tr.replace(/#{bookId}/g, list[i].bookId);
                    let BookDate = list[i].bookDate
                    tr = tr.replace(/#{date}/g, BookDate.slice(0,10));
                    $("#one").append(tr);
                }
                $("#two").empty();
                for (let i = 5; i < list.length; i++) {
                    let tr =
                        "<span class=\"book-part-two\">\n" +
                        "                <input type='hidden' value='#{bookId}'>  " +
                        "                <img src=\"#{bookImg}\" class='img' >\n" +
                        "                <p class='price'>￥"+list[i].bookPrice+"</p>\n" +
                        "                <p class='name'>"+list[i].bookName+"</p>\n" +
                        "                <p class='author'>"+list[i].bookAuthor+"</p>\n" +
                        "                <p class='date'>#{date}</p>\n" +
                        "            </span>"
                    tr = tr.replace(/#{bookId}/g, list[i].bookId);
                    tr = tr.replace(/#{bookImg}/g, list[i].bookImg);

                    let BookDate = list[i].bookDate
                    tr = tr.replace(/#{date}/g, BookDate.slice(0,10));
                    $("#two").append(tr);
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


function initPaginationByType() {
    let bookType = getUrlParam("bookType");
    //获取记录数
    $.ajax({
        url:"/book/getPageAndType",
        type:"GET",
        data:$("#bookSearch").serialize()+"&bookType="+bookType,
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
                    callback:pageSelectByTypeCallback,
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

function pageSelectByTypeCallback(pageIndex) {
    let pageNum = pageIndex + 1;
    let bookType = getUrlParam("bookType");
    $.ajax({
        url: "/book/getPageAndType",
        type: "GET",
        data: "pageNum=" + pageNum + "&" + $("#head-input").serialize()+"&bookType="+bookType,
        dataType: "JSON",
        success: function (json) {
            if (json.state === 200) {
                let list = json.data.list
                console.log(list)
                $("#one").empty();
                let length
                if (list.length !== 10){
                    length = list.length
                }else {
                    length = list.length-5;
                }
                for (let i = 0; i < length; i++) {
                    let tr =
                        "<span class=\"book-part-two\">\n" +
                        "                <input type='hidden' value='#{bookId}'>  " +
                        "                <img src=\"#{bookImg}\" class='img' >\n" +
                        "                <p class='price'>￥"+list[i].bookPrice+"</p>\n" +
                        "                <p class='name'>"+list[i].bookName+"</p>\n" +
                        "                <p class='author'>"+list[i].bookAuthor+"</p>\n" +
                        "                <p class='date'>#{date}</p>\n" +
                        "            </span>"
                    tr = tr.replace(/#{bookImg}/g, list[i].bookImg);
                    tr = tr.replace(/#{bookId}/g, list[i].bookId);
                    let BookDate = list[i].bookDate
                    tr = tr.replace(/#{date}/g, BookDate.slice(0,10));
                    $("#one").append(tr);
                }
                $("#two").empty();
                for (let i = 5; i < list.length; i++) {
                    let tr =
                        "<span class=\"book-part-two\">\n" +
                        "                <input type='hidden' value='#{bookId}'>  " +
                        "                <img src=\"#{bookImg}\" class='img' >\n" +
                        "                <p class='price'>￥"+list[i].bookPrice+"</p>\n" +
                        "                <p class='name'>"+list[i].bookName+"</p>\n" +
                        "                <p class='author'>"+list[i].bookAuthor+"</p>\n" +
                        "                <p class='date'>#{date}</p>\n" +
                        "            </span>"
                    tr = tr.replace(/#{bookImg}/g, list[i].bookImg);
                    tr = tr.replace(/#{bookId}/g, list[i].bookId);
                    let BookDate = list[i].bookDate
                    tr = tr.replace(/#{date}/g, BookDate.slice(0,10));
                    $("#two").append(tr);
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

function initPaginationByKeyword() {
    let keyword = getUrlParam("keyword");
    //获取记录数
    $.ajax({
        url:"/book/getPage",
        type:"GET",
        data:"keyword="+keyword,
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
                    callback:pageSelectByKeywordCallback,
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

function pageSelectByKeywordCallback(pageIndex) {
    let pageNum = pageIndex + 1;
    let keyword = getUrlParam("keyword");
    $.ajax({
        url: "/book/getPage",
        type: "GET",
        data: "pageNum=" + pageNum + "&" + "keyword="+keyword,
        dataType: "JSON",
        success: function (json) {
            if (json.state === 200) {
                let list = json.data.list
                console.log(list)
                $("#one").empty();
                let length
                if (list.length !== 10){
                    length = list.length
                }else {
                    length = list.length-5;
                }
                for (let i = 0; i < length; i++) {
                    let tr =
                        "<span class=\"book-part-two\">\n" +
                        "                <input type='hidden' value='#{bookId}'>  " +
                        "                <img src=\"#{bookImg}\" class='img'>\n" +
                        "                <p class='price'>￥"+list[i].bookPrice+"</p>\n" +
                        "                <p class='name'>"+list[i].bookName+"</p>\n" +
                        "                <p class='author'>"+list[i].bookAuthor+"</p>\n" +
                        "                <p class='date'>#{date}</p>\n" +
                        "            </span>"
                    tr = tr.replace(/#{bookImg}/g, list[i].bookImg);
                    tr = tr.replace(/#{bookId}/g, list[i].bookId);
                    let BookDate = list[i].bookDate
                    tr = tr.replace(/#{date}/g, BookDate.slice(0,10));
                    $("#one").append(tr);
                }
                $("#two").empty();
                for (let i = 5; i < list.length; i++) {
                    let tr =
                        "<span class=\"book-part-two\">\n" +
                        "                <input type='hidden' value='#{bookId}'>  " +
                        "                <img src=\"#{bookImg}\" class='img' >\n" +
                        "                <p class='price'>￥"+list[i].bookPrice+"</p>\n" +
                        "                <p class='name'>"+list[i].bookName+"</p>\n" +
                        "                <p class='author'>"+list[i].bookAuthor+"</p>\n" +
                        "                <p class='date'>#{date}</p>\n" +
                        "            </span>"
                    tr = tr.replace(/#{bookImg}/g, list[i].bookImg);
                    tr = tr.replace(/#{bookId}/g, list[i].bookId);
                    let BookDate = list[i].bookDate
                    tr = tr.replace(/#{date}/g, BookDate.slice(0,10));
                    $("#two").append(tr);
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


function initPaginationByTypeAndKeyword() {
    let bookType = getUrlParam("bookType");
    let keyword = getUrlParam("keyword");
    //获取记录数
    $.ajax({
        url:"/book/getPageAndType",
        type:"GET",
        data:"keyword="+keyword+"&bookType="+bookType,
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
                    callback:pageSelectByTypeAndKeywordCallback,
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

function pageSelectByTypeAndKeywordCallback(pageIndex) {
    let pageNum = pageIndex + 1;
    let keyword = getUrlParam("keyword");
    let bookType = getUrlParam("bookType");
    $.ajax({
        url: "/book/getPageAndType",
        type: "GET",
        data: "pageNum=" + pageNum + "&" + "keyword="+keyword+"&bookType="+bookType,
        dataType: "JSON",
        success: function (json) {
            if (json.state === 200) {
                let list = json.data.list
                console.log(list)
                $("#one").empty();
                let length
                if (list.length !== 10){
                    length = list.length
                }else {
                    length = list.length-5;
                }
                for (let i = 0; i < length; i++) {
                    let tr =
                        "<span class=\"book-part-two\">\n" +
                        "                <input type='hidden' value='#{bookId}'>  " +
                        "                <img src=\"#{bookImg}\" class='img'>\n" +
                        "                <p class='price'>￥"+list[i].bookPrice+"</p>\n" +
                        "                <p class='name'>"+list[i].bookName+"</p>\n" +
                        "                <p class='author'>"+list[i].bookAuthor+"</p>\n" +
                        "                <p class='date'>#{date}</p>\n" +
                        "            </span>"
                    tr = tr.replace(/#{bookImg}/g, list[i].bookImg);
                    tr = tr.replace(/#{bookId}/g, list[i].bookId);
                    let BookDate = list[i].bookDate
                    tr = tr.replace(/#{date}/g, BookDate.slice(0,10));
                    $("#one").append(tr);
                }
                $("#two").empty();
                for (let i = 5; i < list.length; i++) {
                    let tr =
                        "<span class=\"book-part-two\">\n" +
                        "                <input type='hidden' value='#{bookId}'>  " +
                        "                <img src=\"#{bookImg}\" class='img' >\n" +
                        "                <p class='price'>￥"+list[i].bookPrice+"</p>\n" +
                        "                <p class='name'>"+list[i].bookName+"</p>\n" +
                        "                <p class='author'>"+list[i].bookAuthor+"</p>\n" +
                        "                <p class='date'>#{date}</p>\n" +
                        "            </span>"
                    tr = tr.replace(/#{bookImg}/g, list[i].bookImg);
                    tr = tr.replace(/#{bookId}/g, list[i].bookId);
                    let BookDate = list[i].bookDate
                    tr = tr.replace(/#{date}/g, BookDate.slice(0,10));
                    $("#two").append(tr);
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

function initPaginationOrderBy() {
    let orderBy = $("#orderByVal").val();
    //获取记录数
    $.ajax({
        url:"/book/getPageOrderBy",
        type:"GET",
        data:$("#bookSearch").serialize()+"&"+"orderBy="+orderBy,
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
                    callback:pageSelectOrderByCallback,
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

function pageSelectOrderByCallback(pageIndex) {
    let pageNum = pageIndex + 1;
    let orderBy = $("#orderByVal").val();
    $.ajax({
        url: "/book/getPageOrderBy",
        type: "GET",
        data: "pageNum=" + pageNum + "&" + $("#head-input").serialize()+"&orderBy="+orderBy,
        dataType: "JSON",
        success: function (json) {
            if (json.state === 200) {
                let list = json.data.list
                console.log(list)
                $("#one").empty();
                let length
                if (list.length !== 10){
                    length = list.length
                }else {
                    length = list.length-5;
                }
                for (let i = 0; i < length; i++) {
                    let tr =
                        "<span class=\"book-part-two\">\n" +
                        "                <input type='hidden' value='#{bookId}'>  " +
                        "                <img src=\"#{bookImg}\" class='img'>\n" +
                        "                <p class='price'>￥"+list[i].bookPrice+"</p>\n" +
                        "                <p class='name'>"+list[i].bookName+"</p>\n" +
                        "                <p class='author'>"+list[i].bookAuthor+"</p>\n" +
                        "                <p class='date'>#{date}</p>\n" +
                        "            </span>"
                    tr = tr.replace(/#{bookImg}/g, list[i].bookImg);
                    tr = tr.replace(/#{bookId}/g, list[i].bookId);
                    let BookDate = list[i].bookDate
                    tr = tr.replace(/#{date}/g, BookDate.slice(0,10));
                    $("#one").append(tr);
                }
                $("#two").empty();
                for (let i = 5; i < list.length; i++) {
                    let tr =
                        "<span class=\"book-part-two\">\n" +
                        "                <input type='hidden' value='#{bookId}'>  " +
                        "                <img src=\"#{bookImg}\" class='img' >\n" +
                        "                <p class='price'>￥"+list[i].bookPrice+"</p>\n" +
                        "                <p class='name'>"+list[i].bookName+"</p>\n" +
                        "                <p class='author'>"+list[i].bookAuthor+"</p>\n" +
                        "                <p class='date'>#{date}</p>\n" +
                        "            </span>"
                    tr = tr.replace(/#{bookImg}/g, list[i].bookImg);
                    tr = tr.replace(/#{bookId}/g, list[i].bookId);
                    let BookDate = list[i].bookDate
                    tr = tr.replace(/#{date}/g, BookDate.slice(0,10));
                    $("#two").append(tr);
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


function initPaginationByTypeOrderBy() {
    let bookType = getUrlParam("bookType");
    let orderBy = $("#orderByVal").val();
    //获取记录数
    $.ajax({
        url:"/book/getPageAndTypeOrderBy",
        type:"GET",
        data:$("#bookSearch").serialize()+"&bookType="+bookType+"&orderBy="+orderBy,
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
                    callback:pageSelectByTypeOrderByCallback,
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

function pageSelectByTypeOrderByCallback(pageIndex) {
    let pageNum = pageIndex + 1;
    let bookType = getUrlParam("bookType");
    let orderBy = $("#orderByVal").val();
    $.ajax({
        url: "/book/getPageAndTypeOrderBy",
        type: "GET",
        data: "pageNum=" + pageNum + "&" + $("#head-input").serialize()+"&bookType="+bookType+"&orderBy="+orderBy,
        dataType: "JSON",
        success: function (json) {
            if (json.state === 200) {
                let list = json.data.list
                console.log(list)
                $("#one").empty();
                let length
                if (list.length !== 10){
                    length = list.length
                }else {
                    length = list.length-5;
                }
                for (let i = 0; i < length; i++) {
                    let tr =
                        "<span class=\"book-part-two\">\n" +
                        "                <input type='hidden' value='#{bookId}'>  " +
                        "                <img src=\"#{bookImg}\" class='img'>\n" +
                        "                <p class='price'>￥"+list[i].bookPrice+"</p>\n" +
                        "                <p class='name'>"+list[i].bookName+"</p>\n" +
                        "                <p class='author'>"+list[i].bookAuthor+"</p>\n" +
                        "                <p class='date'>#{date}</p>\n" +
                        "            </span>"
                    tr = tr.replace(/#{bookImg}/g, list[i].bookImg);
                    tr = tr.replace(/#{bookId}/g, list[i].bookId);
                    let BookDate = list[i].bookDate
                    tr = tr.replace(/#{date}/g, BookDate.slice(0,10));
                    $("#one").append(tr);
                }
                $("#two").empty();
                for (let i = 5; i < list.length; i++) {
                    let tr =
                        "<span class=\"book-part-two\">\n" +
                        "                <input type='hidden' value='#{bookId}'>  " +
                        "                <img src=\"#{bookImg}\" class='img' >\n" +
                        "                <p class='price'>￥"+list[i].bookPrice+"</p>\n" +
                        "                <p class='name'>"+list[i].bookName+"</p>\n" +
                        "                <p class='author'>"+list[i].bookAuthor+"</p>\n" +
                        "                <p class='date'>#{date}</p>\n" +
                        "            </span>"
                    tr = tr.replace(/#{bookImg}/g, list[i].bookImg);
                    tr = tr.replace(/#{bookId}/g, list[i].bookId);
                    let BookDate = list[i].bookDate
                    tr = tr.replace(/#{date}/g, BookDate.slice(0,10));
                    $("#two").append(tr);
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

function initPaginationByKeywordOrderBy() {
    let keyword = getUrlParam("keyword");
    let orderBy = $("#orderByVal").val();
    //获取记录数
    $.ajax({
        url:"/book/getPageOrderBy",
        type:"GET",
        data:"keyword="+keyword+"&orderBy="+orderBy,
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
                    callback:pageSelectByKeywordOrderByCallback,
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

function pageSelectByKeywordOrderByCallback(pageIndex) {
    let pageNum = pageIndex + 1;
    let keyword = getUrlParam("keyword");
    let orderBy = $("#orderByVal").val();
    $.ajax({
        url: "/book/getPageOrderBy",
        type: "GET",
        data: "pageNum=" + pageNum + "&" + "keyword="+keyword+"&orderBy="+orderBy,
        dataType: "JSON",
        success: function (json) {
            if (json.state === 200) {
                let list = json.data.list
                console.log(list)
                $("#one").empty();
                let length
                if (list.length !== 10){
                    length = list.length
                }else {
                    length = list.length-5;
                }
                for (let i = 0; i < length; i++) {
                    let tr =
                        "<span class=\"book-part-two\">\n" +
                        "                <input type='hidden' value='#{bookId}'>  " +
                        "                <img src=\"#{bookImg}\" class='img'>\n" +
                        "                <p class='price'>￥"+list[i].bookPrice+"</p>\n" +
                        "                <p class='name'>"+list[i].bookName+"</p>\n" +
                        "                <p class='author'>"+list[i].bookAuthor+"</p>\n" +
                        "                <p class='date'>#{date}</p>\n" +
                        "            </span>"
                    tr = tr.replace(/#{bookImg}/g, list[i].bookImg);
                    tr = tr.replace(/#{bookId}/g, list[i].bookId);
                    let BookDate = list[i].bookDate
                    tr = tr.replace(/#{date}/g, BookDate.slice(0,10));
                    $("#one").append(tr);
                }
                $("#two").empty();
                for (let i = 5; i < list.length; i++) {
                    let tr =
                        "<span class=\"book-part-two\">\n" +
                        "                <input type='hidden' value='#{bookId}'>  " +
                        "                <img src=\"#{bookImg}\" class='img' >\n" +
                        "                <p class='price'>￥"+list[i].bookPrice+"</p>\n" +
                        "                <p class='name'>"+list[i].bookName+"</p>\n" +
                        "                <p class='author'>"+list[i].bookAuthor+"</p>\n" +
                        "                <p class='date'>#{date}</p>\n" +
                        "            </span>"
                    tr = tr.replace(/#{bookImg}/g, list[i].bookImg);
                    tr = tr.replace(/#{bookId}/g, list[i].bookId);
                    let BookDate = list[i].bookDate
                    tr = tr.replace(/#{date}/g, BookDate.slice(0,10));
                    $("#two").append(tr);
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


function initPaginationByTypeAndKeywordOrderBy() {
    let bookType = getUrlParam("bookType");
    let keyword = getUrlParam("keyword");
    let orderBy = $("#orderByVal").val();
    //获取记录数
    $.ajax({
        url:"/book/getPageAndType",
        type:"GET",
        data:"keyword="+keyword+"&bookType="+bookType+"&orderBy="+orderBy,
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
                    callback:pageSelectByTypeAndKeywordOrderByCallback,
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

function pageSelectByTypeAndKeywordOrderByCallback(pageIndex) {
    let pageNum = pageIndex + 1;
    let keyword = getUrlParam("keyword");
    let bookType = getUrlParam("bookType");
    let orderBy = $("#orderByVal").val();
    $.ajax({
        url: "/book/getPageAndTypeOrderBy",
        type: "GET",
        data: "pageNum=" + pageNum + "&" + "keyword="+keyword+"&bookType="+bookType+"&orderBy="+orderBy,
        dataType: "JSON",
        success: function (json) {
            if (json.state === 200) {
                let list = json.data.list
                console.log(list)
                $("#one").empty();
                let length
                if (list.length !== 10){
                    length = list.length
                }else {
                    length = list.length-5;
                }
                for (let i = 0; i < length; i++) {
                    let tr =
                        "<span class=\"book-part-two\">\n" +
                        "                <input type='hidden' value='#{bookId}'>  " +
                        "                <img src=\"#{bookImg}\" class='img'>\n" +
                        "                <p class='price'>￥"+list[i].bookPrice+"</p>\n" +
                        "                <p class='name'>"+list[i].bookName+"</p>\n" +
                        "                <p class='author'>"+list[i].bookAuthor+"</p>\n" +
                        "                <p class='date'>#{date}</p>\n" +
                        "            </span>"
                    tr = tr.replace(/#{bookImg}/g, list[i].bookImg);
                    tr = tr.replace(/#{bookId}/g, list[i].bookId);
                    let BookDate = list[i].bookDate
                    tr = tr.replace(/#{date}/g, BookDate.slice(0,10));
                    $("#one").append(tr);
                }
                $("#two").empty();
                for (let i = 5; i < list.length; i++) {
                    let tr =
                        "<span class=\"book-part-two\">\n" +
                        "                <input type='hidden' value='#{bookId}'>  " +
                        "                <img src=\"#{bookImg}\" class='img' >\n" +
                        "                <p class='price'>￥"+list[i].bookPrice+"</p>\n" +
                        "                <p class='name'>"+list[i].bookName+"</p>\n" +
                        "                <p class='author'>"+list[i].bookAuthor+"</p>\n" +
                        "                <p class='date'>#{date}</p>\n" +
                        "            </span>"
                    tr = tr.replace(/#{bookImg}/g, list[i].bookImg);
                    tr = tr.replace(/#{bookId}/g, list[i].bookId);
                    let BookDate = list[i].bookDate
                    tr = tr.replace(/#{date}/g, BookDate.slice(0,10));
                    $("#two").append(tr);
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

function getUrlParam(name){
    // 用该属性获取页面 URL 地址从问号 (?) 开始的 URL（查询部分）
    var url = window.location.search;
    // 正则筛选地址栏
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    // 匹配目标参数
    var result = url.substr(1).match(reg);
    //返回参数值
    return result ? decodeURIComponent(result[2]) : null;
}
