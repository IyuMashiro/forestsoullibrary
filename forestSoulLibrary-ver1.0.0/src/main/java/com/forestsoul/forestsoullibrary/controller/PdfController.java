package com.forestsoul.forestsoullibrary.controller;

import com.forestsoul.forestsoullibrary.entity.Book;
import com.forestsoul.forestsoullibrary.entity.PdfList;
import com.forestsoul.forestsoullibrary.service.PdfListService;
import com.forestsoul.forestsoullibrary.util.JsonResult;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("pdf")
public class PdfController extends BaseController{

    @Autowired
    private PdfListService pdfListService;


    @RequestMapping("findPdf")
    public JsonResult<String> findPdf(HttpSession session,Integer bookId){
        if (session.getAttribute("customerName") == null){
            return new JsonResult<>(5010);
        }
        String url = pdfListService.findPfdById(bookId,getIdFromSession(session));
        return new JsonResult<>(OK,url);
    }

    @RequestMapping("buyPdf")
    public JsonResult<Void> buyPdf(HttpSession session,Integer bookId){
        pdfListService.addPdfList(bookId,getIdFromSession(session));
        return new JsonResult<>(OK);
    }

    @RequestMapping("getBook")
    public JsonResult<Book> getBook(Integer bookId){
        Book data = pdfListService.getBook(bookId);
        return new JsonResult<>(OK,data);
    }

    @RequestMapping("getPage")
    public JsonResult<PageInfo<PdfList>> getPage(HttpSession session,
                                                 @RequestParam(value = "pageNum",defaultValue = "1") Integer pageNum,
                                                 @RequestParam(value = "pageSize",defaultValue = "2") Integer pageSize){
        PageInfo<PdfList> pageInfo = pdfListService.getPdfPage(getIdFromSession(session),pageNum,pageSize);
        return new JsonResult<>(OK,pageInfo);
    }
}
