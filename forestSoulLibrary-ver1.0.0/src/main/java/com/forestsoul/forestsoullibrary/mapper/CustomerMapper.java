package com.forestsoul.forestsoullibrary.mapper;

import com.forestsoul.forestsoullibrary.entity.Customer;
import org.apache.ibatis.annotations.Mapper;

import java.math.BigDecimal;
import java.util.List;


//用户模块的持久层接口
@Mapper
public interface CustomerMapper {
    /**
    * 插入用户数据
    * @param customer 用户的数据
     * @return  受影响的行数
    * */
    Integer insert(Customer customer);

    /**
     * 根据用户名查询用户数据
     * @param name 用户名
     * @return 如果找到对应的用户则放回该用户的数据，否则返回 null
     * */
    Customer findByName(String name);

    /**
     * 根据用户 id 修改用户密码
     * @param customerId 用户id
     * @param customerPassword 用户输入的新密码
     * @return 受影响的行数
     * */
    Integer updatePasswordById(Integer customerId,String customerPassword);

    /**
     * 根据用户的 id 查询用户的值
     * @param customerId 用户 id
     * @return 用户数据
     * */
    Customer findById(Integer customerId);

    /**
     * 更新用户的数据
     * @param customer 用户数据
     * @return 受影响的行数
     * */
    Integer updateInfoById(Customer customer);

    /**
     * 根据用户 id 值来修改用户头像
     * @param customerId 用户 id
     * @param customerIcon 头像路径
     * @return 受影响行数
     * */
    Integer updateIconById(Integer customerId,String customerIcon);

    /**
     * 获取所有用户数据
     * @return 用户数据集合
     * */
    List<Customer> getAllCustomer();

    /**
     * 根据关键字 模糊查询用户数据
     * @param keyword 关键字
     * @return 用户数据
     * */
    List<Customer> getByKeyword(String keyword);

    /**
     * 更新用户拥有书籍数和花费的金额
     * @param customerBookCount  书籍数
     * @param customerPriceCount 花费的金额
     * @return 受影响的行数
     * */
    Integer updateBookCount(Integer customerId,Integer customerBookCount, BigDecimal customerPriceCount);

    /**
     * 更新用户数据
     * @param customer 用户的数据
     * @return  受影响的行数
     * */
    Integer updateCustomer(Customer customer);
    /**
     * 删除用户数据
     * @param customerId 用户 id
     * @return  受影响的行数
     * */
    Integer deleteCustomer(Integer customerId);

}
