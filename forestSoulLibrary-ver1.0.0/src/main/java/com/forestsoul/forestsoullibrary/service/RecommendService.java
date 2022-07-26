package com.forestsoul.forestsoullibrary.service;

import com.forestsoul.forestsoullibrary.entity.Book;
import com.forestsoul.forestsoullibrary.entity.RecommendList;

import java.util.List;

public interface RecommendService {
    /**
    * 获取全部推荐列表数据
    * @return 推荐列表数据
    * */
    List<Book> findAllRecommendBook();

    /**
     * 添加推荐书籍
     * @param bookId 书籍 id
     * */
    void addRecommend(Integer bookId);

    /**
     * 删除推荐书籍
     * @param recommendId 推荐书籍 id
     * */
    void deleteRecommend(Integer bbokId);

    /**
     * 获取推荐列表数量
     * @return 推荐列表数量
     * */
    Integer findRecommendCount();


    /**
     * 根据 id 获取推荐列表数据
     * @return 书籍 id
     * */
    Integer findOnce(Integer bookId);

}
