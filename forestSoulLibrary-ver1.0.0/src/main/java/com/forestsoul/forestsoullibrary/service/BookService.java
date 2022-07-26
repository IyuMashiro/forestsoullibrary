package com.forestsoul.forestsoullibrary.service;

import com.forestsoul.forestsoullibrary.entity.Admin;
import com.forestsoul.forestsoullibrary.entity.Book;
import com.github.pagehelper.PageInfo;

public interface BookService {

    /**
     * 根据书籍 id 查询书籍数据
     * @param bookId 书籍 id
     * @return 书籍数据
     * */
    Book findBookById(Integer bookId);
    /**
     * 获取分页
     * @param keyword 关键字
     * @param pageNum 页号
     * @param pageSize 总页数
     * @return PageInfo 对象
     * */
    PageInfo<Book> getPageInfo(String keyword, Integer pageNum, Integer pageSize);

    /**
     * 获取分页
     * @param keyword 关键字
     * @param bookType 书籍类型
     * @param pageNum 页号
     * @param pageSize 总页数
     * @return PageInfo 对象
     * */
    PageInfo<Book> getPageInfo(String keyword, String bookType,Integer pageNum, Integer pageSize);

    /**
     * 获取分页并按要求排序
     * @param keyword 关键字
     * @param orderBy 排序规则
     * @param pageNum 页号
     * @param pageSize 总页数
     * @return PageInfo 对象
     * */
    PageInfo<Book> getPageInfoOrderBy(String keyword,String orderBy,Integer pageNum, Integer pageSize);

    /**
     * 获取分页并按要求排序
     * @param keyword 关键字
     * @param orderBy 排序规则
     * @param bookType 书籍类型
     * @param pageNum 页号
     * @param pageSize 总页数
     * @return PageInfo 对象
     * */
    PageInfo<Book> getPageInfoOrderBy(String keyword, String bookType,String orderBy,Integer pageNum, Integer pageSize);

    /**
     * 更新书籍销量与库存
     * @param indentId 订单 id
     * */
    void updateSalesAndInventory(Integer indentId);

    /**
     * 删除书籍
     * @param bookId 书籍 id
     * */
    void deleteBook(Integer bookId);

    /**
     * 删除书籍
     * @param book 书籍数据
     * */
    void addBook(Book book);

    /**
     * 更新书籍
     * @param book 书籍数据
     * */
    void updateBook(Book book);
}
