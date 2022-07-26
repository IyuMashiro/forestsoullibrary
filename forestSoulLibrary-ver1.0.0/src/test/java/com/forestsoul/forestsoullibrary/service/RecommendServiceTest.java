package com.forestsoul.forestsoullibrary.service;

import com.forestsoul.forestsoullibrary.entity.Book;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class RecommendServiceTest {

    @Autowired
    private RecommendService recommendService;

    @Test
    public void testRecommendBook(){
        List<Book> allRecommendBook = recommendService.findAllRecommendBook();
        for (Book book:allRecommendBook){
            System.out.println(book);
        }
    }
}
