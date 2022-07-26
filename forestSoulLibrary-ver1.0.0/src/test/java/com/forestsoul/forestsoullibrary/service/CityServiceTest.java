package com.forestsoul.forestsoullibrary.service;

import com.forestsoul.forestsoullibrary.entity.City;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class CityServiceTest {

    @Autowired
    private CityService cityService;

    @Test
    public void testGetByParent(){
        List<City> cityList = cityService.getByParent(10000008);
        for (City city:cityList){
            System.out.println(city);
        }
    }

    @Test
    public void testGetNameByCode(){
        String name = cityService.getNameById(230000);
        System.out.println(name);
    }
}
