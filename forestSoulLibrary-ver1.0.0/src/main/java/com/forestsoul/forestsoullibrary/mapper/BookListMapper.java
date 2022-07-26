package com.forestsoul.forestsoullibrary.mapper;

import com.forestsoul.forestsoullibrary.entity.BookList;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BookListMapper {

    /**
     * 新增书籍订单集合
     * @param bookList 书籍订单集合数据
     * @return 受影响的行数
     * */
    Integer addBookList(BookList bookList);

    List<BookList> getBookListById(Integer indentId);
}
