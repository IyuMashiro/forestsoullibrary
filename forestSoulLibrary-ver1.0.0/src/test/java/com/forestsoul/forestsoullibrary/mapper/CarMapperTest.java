package com.forestsoul.forestsoullibrary.mapper;

import com.forestsoul.forestsoullibrary.entity.Car;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class CarMapperTest {

    @Autowired
    private CarMapper carMapper;

    @Test
    public void findCarByCustomerId(){
        List<Car> list = carMapper.findCarByCustomerId(5);
        for (Car car : list){
            System.out.println(car);
        }
    }

    @Test
    public void setBookCount(){
        carMapper.setBookCount(1,5,1);
    }

    @Test
    public void addCar(){
        carMapper.addCar(1,5,5);
    }
}
