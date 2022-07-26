package com.forestsoul.forestsoullibrary.mapper;

import com.forestsoul.forestsoullibrary.entity.Book;
import com.forestsoul.forestsoullibrary.entity.Customer;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BookMapper {

    /**
     * 根据 id 查询书籍数据
     * @param bookId 书籍 id
     * @return 书籍数据
     * */
    Book findById(Integer bookId);

    /**
     * 根据关键字查询对应书籍数据
     * @param keyword  关键字
     * @return 书籍数据
     * */
    List<Book> getByKeyword(String keyword);

    /**
     * 根据关键字和书籍类别查询对应书籍数据
     * @param keyword  关键字
     * @param bookForm 书籍类别
     * @return 书籍数据
     * */
    List<Book> getByKeywordAndBookType(String keyword,String bookForm);

    /**
     * 根据关键字查询对应书籍数据并根据要求排序
     * @param keyword  关键字
     * @return 书籍数据
     * */
    List<Book> getByKeywordOrderBy(String keyword,String orderBy);

    /**
     * 根据关键字和书籍类别查询对应书籍数据并根据要求排序
     * @param keyword  关键字
     * @param bookForm 书籍类别
     * @return 书籍数据
     * */
    List<Book> getByKeywordAndBookTypeOrderBy(String keyword,String bookForm,String orderBy);

    /**
     * 更新书籍销量与库存
     * @param bookId 书籍 id
     * @param bookSales 书籍销量
     * @param bookInventory 书籍库存
     * @return 受影响的条数
     * */
    Integer updateSalesAndInventory(Integer bookId,Integer bookSales,Integer bookInventory);

    /**
     * 删除书籍
     * @param bookId 书籍 id
     * @return 受影响的行数
     * */
    Integer deleteBook(Integer bookId);

    /**
     * 添加书籍
     * @param book 书籍数据
     * @return 受影响的行数
     * */
    Integer addBook(Book book);

    /**
     * 更新书籍
     * @param book 书籍数据
     * @return 受影响的行数
     * */
    Integer updateBook(Book book);

}
