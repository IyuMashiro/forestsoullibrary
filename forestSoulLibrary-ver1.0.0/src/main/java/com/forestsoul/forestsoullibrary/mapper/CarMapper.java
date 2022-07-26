package com.forestsoul.forestsoullibrary.mapper;

import com.forestsoul.forestsoullibrary.entity.Car;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CarMapper {

    /**
     * 根据用户 id 查询购物车信息
     * @param customerId 用户 id
     * @return 购物车信息
     * */
    List<Car> findCarByCustomerId(Integer customerId);

    /**
     * 添加购物车数据
     * @param customerId 用户id
     * @param bookId 书籍 id
     * @param bookCount 书籍数
     * @return 受影响的行数
     * */
    Integer addCar(Integer customerId,Integer bookId,Integer bookCount);

    /**
     * 根据用户 id 和书籍 id 查询书籍数量
     * @param customerId 用户 id
     * @param bookId 书籍 id
     * @return 书籍数量
     * */
    Integer getBookCount(Integer customerId,Integer bookId);

    /**
     * 根据用户 id 和书籍 id 设置书籍数量
     * @param customerId 用户 id
     * @param bookId 书籍 id
     * @param bookCount 书籍数量
     * */
    Integer setBookCount(Integer customerId,Integer bookId,Integer bookCount);

    /**
     * 根据 用户 id 和书籍 id 删除对应的数据
     * @param customerId 用户 id
     * @param bookId 书籍 id
     * @return 受影响的行数
     * */
    Integer deleteById(Integer customerId,Integer bookId);
    /**
     * 根据 用户 id 和书籍 id 删除对应的数据
     * @param customerId 用户 id
     * @return 受影响的行数
     * */
    Integer deleteAll(Integer customerId);
}
