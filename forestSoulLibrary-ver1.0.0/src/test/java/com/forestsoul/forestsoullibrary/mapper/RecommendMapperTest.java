package com.forestsoul.forestsoullibrary.mapper;


import com.forestsoul.forestsoullibrary.entity.RecommendList;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class RecommendMapperTest {

    @Autowired
    private RecommendListMapper recommendListMapper;

    @Test
    public void testFindBookById(){
        Integer bookId = recommendListMapper.findBookById(1);
        System.out.println(bookId);
    }



    @Test
    public void testGetAll(){
        List<RecommendList> lists = recommendListMapper.getAllRecommend();
        for (RecommendList recommendList : lists){
            System.out.println(recommendList);
        }
    }
}
