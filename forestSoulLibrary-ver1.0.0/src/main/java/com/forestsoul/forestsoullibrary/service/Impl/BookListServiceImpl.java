package com.forestsoul.forestsoullibrary.service.Impl;

import com.forestsoul.forestsoullibrary.entity.BookList;
import com.forestsoul.forestsoullibrary.mapper.BookListMapper;
import com.forestsoul.forestsoullibrary.service.BookListService;
import com.forestsoul.forestsoullibrary.service.exception.BookListNotFoundException;
import com.forestsoul.forestsoullibrary.service.exception.InsertException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookListServiceImpl implements BookListService {
    @Autowired
    private BookListMapper bookListMapper;

    @Override
    public void addBookList(BookList bookList) {
        Integer rows = bookListMapper.addBookList(bookList);
        if (rows != 1){
            throw new InsertException("新增书籍订单集合出现未知异常");
        }
    }

    @Override
    public List<BookList> getBookListById(Integer indentId) {
        List<BookList> list = bookListMapper.getBookListById(indentId);
        if (list == null){
            throw new BookListNotFoundException("订单书籍集合数据不存在");
        }
        return list;
    }
}
