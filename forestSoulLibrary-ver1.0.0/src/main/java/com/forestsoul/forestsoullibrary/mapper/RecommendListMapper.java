package com.forestsoul.forestsoullibrary.mapper;

import com.forestsoul.forestsoullibrary.entity.RecommendList;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RecommendListMapper {
    /**
     * 根据 推荐列表 id 查询对应推荐书籍
     * @param recommendId 推荐列表 id
     * @return 书籍 id
     * */
    Integer findBookById(Integer recommendId);

    /**
     * 获取推荐列表中的全部数据
     * @return 推荐列表数据
     * */
    List<RecommendList> getAllRecommend();

    /**
     * 添加推荐书籍
     * @param bookId 书籍 id
     * @return 推荐列表数据
     * */
    Integer addRecommend(Integer bookId);

    /**
     * 删除推荐书籍
     * @param bookId 推荐书籍 id
     * @return 推荐列表数据
     * */
    Integer deleteRecommend(Integer bookId);


}
