package com.forestsoul.forestsoullibrary.service;

import com.forestsoul.forestsoullibrary.entity.Admin;
import com.forestsoul.forestsoullibrary.entity.Customer;
import com.github.pagehelper.PageInfo;

import java.math.BigDecimal;
import java.util.List;

public interface CustomerService {
    /**
     * 用户注册方法
     * @param customer 用户的数据对象
     * */
    void reg(Customer customer);

    /**
     * 用户登录方法
     * @param customerLogin 用户名
     * @param password 密码
     * @return 当前匹配的用户数据，如果没有返回 null
     * */
    Customer login(String customerLogin,String password);

    /**
     * 查询用户是否存在
     * @param customer 用户参数
     * @return 返回 1 用户已存在 ，返回 0 则不存在
     * */
    Integer selectByLogin(Customer customer);

    /**
     * 更改密码
     * @param customersId 用户 id
     * @param oldPassword 原始密码
     * @param newPassword 新密码
     * */
    void changePassword(Integer customersId,String oldPassword,String newPassword);

    /**
     * 根据用户的 id 查询用户数据
     * @param customerId 用户 id
     * @return 用户数据
     * */
    Customer getById(Integer customerId);


    /**
     * 更新用户数据
     * @param customerId 用户 id
     * @param customer 用户数据
     * */
    void changeInfo(Integer customerId,Customer customer);

    /**
     * 更改用户头像
     * @param customerId 用户 id
     * @param customerIcon 用户头像
     * */
    void changeIcon(Integer customerId,String customerIcon);

    /**
     * 获取所有用户数据
     * @return 用户数据集合
     * */
    List<Customer> getAllCustomer();

    /**
     * 获取分页
     * @param keyword 关键字
     * @param pageNum 页号
     * @param pageSize 总页数
     * @return PageInfo 对象
     * */
    PageInfo<Customer> getPageInfo(String keyword, Integer pageNum, Integer pageSize);

    /**
     * 更新用户拥有书籍和总花费金额
     * @param customerId 用户 id
     * @param bookPrice 花费的金额
     * */
    void updateBookCount(Integer customerId, Integer bookCount, BigDecimal bookPrice);

    /**
     * 更新用户数据
     * @param customerId 用户 id
     * @param customer 用户数据
     * */
    void updateCustomer(Integer customerId, Customer customer);
    /**
     * 删除用户数据
     * @param customerId 用户 id
     * */
    void deleteCustomer(Integer customerId);
}
