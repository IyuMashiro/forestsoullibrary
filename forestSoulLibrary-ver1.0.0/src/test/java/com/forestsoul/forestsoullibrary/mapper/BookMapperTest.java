package com.forestsoul.forestsoullibrary.mapper;

import com.forestsoul.forestsoullibrary.entity.Book;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class BookMapperTest {

    @Autowired
    private BookMapper bookMapper;

    @Test
    public void testFindBookById(){
        Book book = bookMapper.findById(1);
        System.out.println(book);
    }

    @Test
    public void testGetByKeywordAndBookType(){
        List<Book> list = bookMapper.getByKeywordAndBookType("", "民间文学");
        for (Book book : list){
            System.out.println(book);
        }
    }

    @Test
    public void testOrderBy(){
        List<Book> list = bookMapper.getByKeywordOrderBy("", "book_date");
        for (Book book : list){
            System.out.println(book);
        }
    }
}
