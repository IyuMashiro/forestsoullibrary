package com.forestsoul.forestsoullibrary.service;

import com.forestsoul.forestsoullibrary.entity.Book;
import com.github.pagehelper.PageInfo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class BookServiceTest {
    @Autowired
    private BookService bookService;

    @Test
    public void testFindBookById(){
        Book book = bookService.findBookById(1);
        System.out.println(book);
    }

    @Test
    public void testPageInfo(){
        PageInfo<Book> pageInfo = bookService.getPageInfo("","民间文学" ,1, 5);
        for (Book book: pageInfo.getList()){
            System.out.println(book);
        }
    }
}
