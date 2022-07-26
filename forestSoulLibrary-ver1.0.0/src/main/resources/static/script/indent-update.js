$(function () {
    let id = $.getUrlParam("indentId");

    $.ajax({
        url:"/indent/getOnce",
        type:"GET",
        data:"indentId="+id,
        dataType:"JSON",
        success:function (json){
            $("#name").val(json.data.indentName);
            $("#address").val(json.data.indentAddress)
            $("#phone").val(json.data.indentPhone)
            $("#price").val(json.data.indentPrice)
            $("#state").val(json.data.indentState)
        },
        error:function (xhr){

        }
    })

    $("#register-form-sub").click(function () {
        let name = $("#name").val();
        let address = $("#address").val();
        let phone = $("#phone").val();
        let price = $("#price").val();
        let state = $("#state").val();
        $.ajax({
            url:"/indent/update",
            type:"GET",
            data: $("#form").serialize()+"&indentId="+id,
            contentType: 'text/json,charset=utf-8',
            dataType:"JSON",
            success:function (json){
               location.href="../web/indent-page.html"
            },
            error:function (xhr){

            }
        })
    })
})