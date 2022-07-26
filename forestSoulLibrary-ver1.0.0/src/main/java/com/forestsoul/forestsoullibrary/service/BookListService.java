package com.forestsoul.forestsoullibrary.service;

import com.forestsoul.forestsoullibrary.entity.BookList;

import java.util.List;

public interface BookListService {

    /**
     * 添加订单书籍集合
     * @param bookList 书籍集合书籍
     * */
    void addBookList(BookList bookList);

    /**
     * 获取订单书籍集合
     * @param indentId 订单 id
     * @return 订单书籍集合
     * */
    List<BookList> getBookListById(Integer indentId);
}
