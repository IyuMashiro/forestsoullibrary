package com.forestsoul.forestsoullibrary.service;

import com.forestsoul.forestsoullibrary.entity.Admin;
import com.forestsoul.forestsoullibrary.entity.Customer;
import com.github.pagehelper.PageInfo;

import java.util.List;

public interface AdminService {
    /**
     * 管理员登录方法
     * @param loginAcct 用户名
     * @param password 密码
     * @return 当前匹配的用户数据，如果没有返回 null
     * */
    Admin login(String loginAcct, String password);

    /**
     * 管理员登录方法
     * @param id 管理员 id
     * @return 当前匹配的用户数据，如果没有返回 null
     * */
    Admin findById(Integer id);

    /**
     * 获取全部管理员账户
     * @return 管理数据集合
     * */
    List<Admin> getAll();

    /**
     * 获取分页
     * @param keyword 关键字
     * @param pageNum 页号
     * @param pageSize 总页数
     * @return PageInfo 对象
     * */
    PageInfo<Admin> getPageInfo(String keyword,Integer pageNum,Integer pageSize);

    /**
    * 删除管理员账号
    * @param Id 管理员 id
    * */
    void deleteAdmin(Integer Id);

    /**
     * 添加管理员账号
     * @param admin 管理员 数据
     * */
    void addAdmin(Admin admin);
    /**
     * 关系管理员账号
     * @param id 管理员 id
     * @param admin 管理员 数据
     * */
    void updateAdmin(Integer id,Admin admin);

}
