package com.forestsoul.forestsoullibrary.controller;

import com.forestsoul.forestsoullibrary.entity.Admin;
import com.forestsoul.forestsoullibrary.entity.Book;
import com.forestsoul.forestsoullibrary.service.BookService;
import com.forestsoul.forestsoullibrary.service.exception.*;
import com.forestsoul.forestsoullibrary.util.JsonResult;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;



@RestController
@RequestMapping("book")
public class BookController extends BaseController{

    @Autowired
    private BookService bookService;

    @RequestMapping("info")
    public JsonResult<Book> getBookInfo(Integer bookId){
        Book book = bookService.findBookById(bookId);
        return new JsonResult<>(OK,book);
    }

    @RequestMapping(value = "getPage")
    public JsonResult<PageInfo<Book>> getPage(@RequestParam(value = "keyword" ,defaultValue = "") String keyword,
                                               @RequestParam(value = "pageNum",defaultValue = "1") Integer pageNum,
                                               @RequestParam(value = "pageSize",defaultValue = "10") Integer pageSize){
        PageInfo<Book> pageInfo = bookService.getPageInfo(keyword, pageNum, pageSize);
        return new JsonResult<>(OK,pageInfo);
    }

    @RequestMapping(value = "getPageAndType")
    public JsonResult<PageInfo<Book>> getPage(@RequestParam(value = "keyword" ,defaultValue = "") String keyword,
                                              @RequestParam(value = "bookType" ,defaultValue = "") String bookType,
                                              @RequestParam(value = "pageNum",defaultValue = "1") Integer pageNum,
                                              @RequestParam(value = "pageSize",defaultValue = "10") Integer pageSize){
        PageInfo<Book> pageInfo = bookService.getPageInfo(keyword,bookType ,pageNum, pageSize);
        return new JsonResult<>(OK,pageInfo);
    }

    @RequestMapping("getPageOrderBy")
    public JsonResult<PageInfo<Book>> getPageOrderBy(@RequestParam(value = "keyword" ,defaultValue = "") String keyword,
                                                     @RequestParam(value = "orderBy",defaultValue = "book_id") String orderBy,
                                                     @RequestParam(value = "pageNum",defaultValue = "1") Integer pageNum,
                                                     @RequestParam(value = "pageSize",defaultValue = "10") Integer pageSize){

        PageInfo<Book> pageInfo = bookService.getPageInfoOrderBy(keyword,orderBy,pageNum,pageSize);
        return new JsonResult<>(OK,pageInfo);
    }
    @RequestMapping(value = "getPageAndTypeOrderBy")
    public JsonResult<PageInfo<Book>> getPageOrderBy(@RequestParam(value = "keyword" ,defaultValue = "") String keyword,
                                                     @RequestParam(value = "bookType" ,defaultValue = "") String bookType,
                                                     @RequestParam(value = "orderBy",defaultValue = "book_id") String orderBy,
                                                     @RequestParam(value = "pageNum",defaultValue = "1") Integer pageNum,
                                                @RequestParam(value = "pageSize",defaultValue = "10") Integer pageSize){

        PageInfo<Book> pageInfo = bookService.getPageInfoOrderBy(keyword,bookType,orderBy,pageNum,pageSize);
        return new JsonResult<>(OK,pageInfo);
    }

    @RequestMapping(value = "updateSalesAndInventory")
    public JsonResult<Void> updateSalesAndInventory(Integer indentId){
        bookService.updateSalesAndInventory(indentId);
        return new JsonResult<>(OK);
    }

    @RequestMapping(value = "delete")
    public JsonResult<Void> deleteBook(Integer id){
        bookService.deleteBook(id);
        return new JsonResult<>(OK);
    }

    public static final int ICON_MAX_SIZE = 10 * 1024 * 1024;
    //限制文件类型
    public static final List<String > ICON_TYPE = new ArrayList<>();
    static {
        ICON_TYPE.add("image/jpeg");
        ICON_TYPE.add("image/png");
        ICON_TYPE.add("image/bmp");
        ICON_TYPE.add("image/gif");
        ICON_TYPE.add("image/jpg");
    }

    @RequestMapping("add")
    public JsonResult<Void> addBook(Book book){
        String imgUrl = "/bookImg/default.jpg";
        String pdfUrl = "/pdf/default.pdf";
        if (book.getBookImg().equals("undefined")){
            book.setBookImg(imgUrl);
        }
        if (book.getBookPdf().equals("undefined")){
            book.setBookPdf(pdfUrl);
        }
        book.setBookDelete(0);
        book.setBookSales(0);
        bookService.addBook(book);
        return new JsonResult<>(OK);
    }

    @RequestMapping("update")
    public JsonResult<Void> updateBook(Integer id,Book book){
        book.setBookId(id);
        if (book.getBookImg().equals("undefined")){
            book.setBookImg(null);
        }
        if (book.getBookPdf().equals("undefined")){
            book.setBookPdf(null);
        }
        bookService.updateBook(book);
        return new JsonResult<>(OK);
    }

    @RequestMapping(value = "addIcon")
    public JsonResult<String> addIcon(HttpSession session, @RequestParam("icon") MultipartFile file){
        if (file == null){
            throw new FileEmptyException("文件为空");
        }
        if (file.getSize() > ICON_MAX_SIZE){
            throw new FileSizeException("文件大小超出限制");
        }
        String contentType = file.getContentType();
        if (!ICON_TYPE.contains(contentType)){
            throw new FileTypeException("文件类型错误");
        }

        String parent = session.getServletContext().getRealPath("bookImg");

        File dir = new File("target/classes/static/bookImg");
        if (!dir.exists()){
            dir.mkdirs();
        }
        String originalFilename = file.getOriginalFilename();
        int index = originalFilename.lastIndexOf(".");
        String suffix = originalFilename.substring(index);
        String fileName = UUID.randomUUID().toString().toUpperCase()+suffix;
        File dest = new File(dir.getAbsoluteFile(),fileName);
        try {
            file.transferTo(dest);
        }catch (FileStateException e){
            throw new FileStateException("文件状态异常");
        } catch (IOException e) {
            throw new FileUploadIOException("文件 IO 异常");
        }
        String url = "/bookImg/"+fileName;

        //将文件复制到upload文件夹中
        File upload = new File("src/main/resources/static/bookImg");
        Path oldPath = Paths.get(dir.getAbsoluteFile()+"/"+fileName);
        Path newPath = Paths.get(upload.getAbsolutePath()+"/"+fileName);
        try {
            Files.copy(oldPath,newPath);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return new JsonResult<>(OK,url);
    }

    @RequestMapping(value = "addPdf")
    public JsonResult<String> addPdf(HttpSession session, @RequestParam("pdf") MultipartFile file){
        if (file == null){
            throw new FileEmptyException("文件为空");
        }

        String parent = session.getServletContext().getRealPath("pdf");

        File dir = new File("target/classes/static/pdf");
        if (!dir.exists()){
            dir.mkdirs();
        }
        String originalFilename = file.getOriginalFilename();
        int index = originalFilename.lastIndexOf(".");
        String suffix = originalFilename.substring(index);
        String fileName = UUID.randomUUID().toString().toUpperCase()+suffix;
        File dest = new File(dir.getAbsoluteFile(),fileName);
        try {
            file.transferTo(dest);
        }catch (FileStateException e){
            throw new FileStateException("文件状态异常");
        } catch (IOException e) {
            throw new FileUploadIOException("文件 IO 异常");
        }
        String url = "/pdf/"+fileName;

        //将文件复制到upload文件夹中
        File upload = new File("src/main/resources/static/pdf");
        Path oldPath = Paths.get(dir.getAbsoluteFile()+"/"+fileName);
        Path newPath = Paths.get(upload.getAbsolutePath()+"/"+fileName);
        try {
            Files.copy(oldPath,newPath);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return new JsonResult<>(OK,url);
    }

}
