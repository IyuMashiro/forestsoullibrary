package com.forestsoul.forestsoullibrary.mapper;

import com.forestsoul.forestsoullibrary.entity.City;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class CityMapperTest {

    @Autowired
    private CityMapper cityMapper;

    @Test
    public void testCity(){
        List<City> list = cityMapper.findByParent(10000000);
        for (City city:list){
            System.out.println(city);
        }
    }

    @Test
    public void testGetNameByCode(){
        String name = cityMapper.findNameById(110000);
        System.out.println(name);
    }
}
