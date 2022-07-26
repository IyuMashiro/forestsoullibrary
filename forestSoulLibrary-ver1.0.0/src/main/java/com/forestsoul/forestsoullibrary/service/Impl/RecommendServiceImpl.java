package com.forestsoul.forestsoullibrary.service.Impl;

import com.forestsoul.forestsoullibrary.entity.Book;
import com.forestsoul.forestsoullibrary.entity.RecommendList;
import com.forestsoul.forestsoullibrary.mapper.BookMapper;
import com.forestsoul.forestsoullibrary.mapper.RecommendListMapper;
import com.forestsoul.forestsoullibrary.service.BookService;
import com.forestsoul.forestsoullibrary.service.RecommendService;
import com.forestsoul.forestsoullibrary.service.exception.BookListNotFoundException;
import com.forestsoul.forestsoullibrary.service.exception.RecommendNofFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RecommendServiceImpl implements RecommendService {

    @Autowired
    private RecommendListMapper recommendListMapper;
    @Autowired
    private BookService bookService;

    @Override
    public List<Book> findAllRecommendBook() {
        List<RecommendList> allRecommend = recommendListMapper.getAllRecommend();
        if (allRecommend == null){
            throw new RecommendNofFoundException("推荐数据为空");
        }
        List<Book> bookList = new ArrayList<>();
        for (RecommendList recommendList: allRecommend){
            bookList.add(bookService.findBookById(recommendList.getBookId())) ;
        }

        return bookList;
    }

    @Override
    public void addRecommend(Integer bookId) {
        recommendListMapper.addRecommend(bookId);
    }

    @Override
    public void deleteRecommend(Integer bookId) {
        recommendListMapper.deleteRecommend(bookId);
    }

    @Override
    public Integer findRecommendCount() {
        List<RecommendList> allRecommend = recommendListMapper.getAllRecommend();
        return  allRecommend.size();

    }

    @Override
    public Integer findOnce(Integer bookId) {
        Integer bookById = recommendListMapper.findBookById(bookId);
        if (bookById == null){
            throw new BookListNotFoundException("未找到数据");
        }
        return bookById;
    }
}
