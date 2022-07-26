package com.forestsoul.forestsoullibrary.controller;

import com.forestsoul.forestsoullibrary.entity.BookList;
import com.forestsoul.forestsoullibrary.service.BookListService;
import com.forestsoul.forestsoullibrary.util.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("bookList")
public class BookListController extends BaseController{
    @Autowired
    private BookListService bookListService;

    @RequestMapping("getInfo")
    public JsonResult<List<BookList>> getBookList(Integer indentId){
        List<BookList> bookLists = bookListService.getBookListById(indentId);
        return new JsonResult<>(OK,bookLists);
    }
}
