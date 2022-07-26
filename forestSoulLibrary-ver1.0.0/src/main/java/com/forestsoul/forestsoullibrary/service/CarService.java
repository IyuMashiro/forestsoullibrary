package com.forestsoul.forestsoullibrary.service;


import com.forestsoul.forestsoullibrary.entity.Car;

import java.util.List;

public interface CarService {

    /**
     * 根据用户 id 获取购物车数据
     * @param customerId 用户 id
     * @return 购物车数据
    * */
    List<Car> getCarById(Integer customerId);

    /**
     * 添加购物车数据
     * @param car 购物车数据
     * */
    void addCar(Car car);

    /**
     * 根据用户 id 和书籍 id 查询书籍数量
     * @param customerId 用户 id
     * @param bookId 书籍 id
     * @return 书籍数量
     * */
    Integer getBookCount(Integer customerId,Integer bookId);

    /**
     * 根据用户 id 和书籍 id 修改书籍数量
     * @param customerId 用户 id
     * @param bookId 书籍 id
     * @param bookCount 书籍数
     * */
    void setBookCount(Integer bookCount,Integer customerId,Integer bookId);

    /**
     * 根据 用户 id 和书籍 id 删除对应的数据
     * @param customerId 用户 id
     * @param bookId 书籍 id
     * */
    void deleteById(Integer customerId,Integer bookId);

    /**
     * 根据 用户 id 和书籍 id 删除对应的数据
     * @param customerId 用户 id
     * */
    void deleteByAll(Integer customerId);
}
