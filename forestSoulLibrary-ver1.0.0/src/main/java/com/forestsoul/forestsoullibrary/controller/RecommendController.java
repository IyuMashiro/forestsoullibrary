package com.forestsoul.forestsoullibrary.controller;

import com.forestsoul.forestsoullibrary.entity.Book;
import com.forestsoul.forestsoullibrary.entity.Indent;
import com.forestsoul.forestsoullibrary.service.RecommendService;
import com.forestsoul.forestsoullibrary.util.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequestMapping("recommend")
public class RecommendController extends BaseController{

    @Autowired
    private RecommendService recommendService;

    @RequestMapping(value = "book")
    public JsonResult<List<Book>> RecommendBook(){
        List<Book> data = recommendService.findAllRecommendBook();
        return new JsonResult<>(OK,data);
    }

    @RequestMapping("count")
    public JsonResult<Integer> RecommendCount(){
        Integer data = recommendService.findRecommendCount();
        return new JsonResult<>(OK,data);
    }

    @RequestMapping("add")
    public JsonResult<Void> addRecommend(Integer bookId){
        recommendService.addRecommend(bookId);
        return new JsonResult<>(OK);
    }

    @RequestMapping("delete")
    public JsonResult<Void> deleteRecommend(Integer bookId){
        recommendService.deleteRecommend(bookId);
        return new JsonResult<>(OK);
    }

    @RequestMapping("getId")
    public JsonResult<Integer> getBookId(Integer bookId){
        Integer data = recommendService.findOnce(bookId);
        return new JsonResult<>(OK,data);
    }
}
