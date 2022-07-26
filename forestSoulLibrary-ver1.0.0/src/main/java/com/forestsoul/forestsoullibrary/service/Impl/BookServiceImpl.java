package com.forestsoul.forestsoullibrary.service.Impl;

import com.forestsoul.forestsoullibrary.entity.Book;
import com.forestsoul.forestsoullibrary.entity.BookList;
import com.forestsoul.forestsoullibrary.mapper.BookMapper;
import com.forestsoul.forestsoullibrary.service.BookListService;
import com.forestsoul.forestsoullibrary.service.BookService;
import com.forestsoul.forestsoullibrary.service.exception.*;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookMapper bookMapper;
    @Autowired
    private BookListService bookListService;
    @Override
    public Book findBookById(Integer bookId) {
        Book book = bookMapper.findById(bookId);
        if (book == null || book.getBookDelete() == 1){
            throw new BookNotFoundException("书籍数据不存在");
        }
        return book;
    }

    @Override
    public PageInfo<Book> getPageInfo(String keyword, Integer pageNum, Integer pageSize) {
        //调用 pageHelper 的静态方法开启分页功能
        PageHelper.startPage(pageNum,pageSize);

        List<Book> list = bookMapper.getByKeyword(keyword);

        return new  PageInfo<>(list);
    }

    @Override
    public PageInfo<Book> getPageInfo(String keyword,String bookType ,Integer pageNum, Integer pageSize) {
        //调用 pageHelper 的静态方法开启分页功能
        PageHelper.startPage(pageNum,pageSize);

        List<Book> list = bookMapper.getByKeywordAndBookType(keyword,bookType);

        return new  PageInfo<>(list);
    }

    @Override
    public PageInfo<Book> getPageInfoOrderBy(String keyword, String orderBy, Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        switch (orderBy) {
            case "book_id" -> orderBy = "book_id";
            case "book_inventory" -> orderBy = "book_inventory";
            case "book_price" -> orderBy = "book_price";
            case "book_date" -> orderBy = "book_date";
            default -> throw new BookOrderByException("排序类型错误");
        }
        List<Book> list = bookMapper.getByKeywordOrderBy(keyword,orderBy);
        System.out.println(list);
        return new  PageInfo<>(list);
    }

    @Override
    public PageInfo<Book> getPageInfoOrderBy(String keyword, String bookType, String orderBy, Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        switch (orderBy) {
            case "book_id" -> orderBy = "book_id";
            case "book_inventory" -> orderBy = "book_inventory";
            case "book_price" -> orderBy = "book_price";
            case "book_date" -> orderBy = "book_date";
            default -> throw new BookOrderByException("排序类型错误");
        }

        List<Book> list = bookMapper.getByKeywordAndBookTypeOrderBy(keyword,bookType,orderBy);

        return new  PageInfo<>(list);
    }

    @Override
    public void updateSalesAndInventory(Integer indentId) {
        List<BookList> bookLists = bookListService.getBookListById(indentId);

        for (BookList bookList:bookLists){
            Integer bookId = bookList.getBookId();
            Integer bookCount = bookList.getBookCount();
            Book book = bookMapper.findById(bookId);
            Integer sales = book.getBookSales();
            Integer inventory = book.getBookInventory();
            inventory -= bookCount;
            sales += bookCount;

            Integer rows = bookMapper.updateSalesAndInventory(bookId,sales,inventory);

            if (rows != 1){
                throw new UpdateException("更新数据时出现未知异常");
            }
        }
    }

    @Override
    public void deleteBook(Integer bookId) {
        Integer rows = bookMapper.deleteBook(bookId);
        if (rows != 1){
            throw new DeleteException("删除数据时出现异常");
        }
    }

    @Override
    public void addBook(Book book) {
        Integer rows = bookMapper.addBook(book);
        if (rows != 1){
            throw new InsertException("插入数据时出现未知异常");
        }
    }

    @Override
    public void updateBook(Book book) {
        Integer rows = bookMapper.updateBook(book);
        if (rows!=1 ){
            throw new UpdateException("更新数据时出现未知异常");
        }
    }
}
