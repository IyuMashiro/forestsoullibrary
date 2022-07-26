$(function () {

    $("#register-form-sub").click(function () {
        $.ajax({
            url:"/book/add",
            type:"POST",
            data:$("#form").serialize()+"&bookImg="+iconUrl+"&bookPdf="+pdfUrl,
            dataType:"JSON",
            success:function (json){
                if (json.state === 200){
                    location.href="../web/book-page.html"
                }else{
                    alert("失败")
                }
            },
            error:function (xhr){
                alert("更新时产生未知异常"+xhr.message);
            }
        })
    })

    $("#icon").on("click",function (){
        $(this).parent().prev(".kv-fileinput-upload").attr("type","button").attr("id","uploadIcon")
    })

    $("#pdf").on("click",function (){
        $(this).parent().prev(".kv-fileinput-upload").attr("type","button").attr("id","uploadPdf")
    })

    let iconUrl;
    let pdfUrl;
    $(document).on("click","#uploadIcon",function (){
        let formData = new FormData();
        formData.append("icon",$("#icon")[0].files[0])
        $.ajax({
            url:"/book/addIcon",
            type:"POST",
            data: formData,
            processData:false,
            contentType:false,
            async:false,
            dataType:"JSON",
            success:function (json){
                if (json.state === 200){
                    iconUrl = json.data;
                }else{
                    alert("失败")
                }
            },
            error:function (xhr){
                alert("更新时产生未知异常"+xhr.message);
            }
        })
    })

    $(document).on("click","#uploadPdf",function (){
        let formData = new FormData();
        formData.append("pdf",$("#pdf")[0].files[0])
        $.ajax({
            url:"/book/addPdf",
            type:"POST",
            data: formData,
            processData:false,
            contentType:false,
            async:false,
            dataType:"JSON",
            success:function (json){
                if (json.state === 200){
                    pdfUrl = json.data;
                }else{
                    alert("失败")
                }
            },
            error:function (xhr){
                alert("更新时产生未知异常"+xhr.message);
            }
        })
    })

})