package com.forestsoul.forestsoullibrary.mapper;

import com.forestsoul.forestsoullibrary.entity.Admin;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminMapper {

    /**
     * 根据用户名查询用户数据
     * @param acct 用户名
     * @return 如果找到对应的用户则放回该用户的数据，否则返回 null
     * */
    Admin findByAcct(String acct);

    /**
     * 根据管理员 id 查询管理员数据
     * @param id 管理员 id
     * @return 管理员数据
     * */
    Admin findById(Integer id);

    /**
     * 查询所有管理员数据
     * @return 管理员数据
     * */
    List<Admin> getAll();

    /**
     * 根据关键字 模糊查询管理员数据
     * @param keyword 关键字
     * @return 管理员数据
     * */
    List<Admin> getByKeyword(String keyword);

    /**
     * 根据 id 删除管理员账户
     * @param id 管理员 id
     * @return 受影响的行数
     * */
    Integer deleteAdmin(Integer id);

    /**
     * 新增管理员账户
     * @param admin 管理员数据
     * @return 受影响的行数
     * */
    Integer addAdmin(Admin admin);

    /**
     * 更新管理员账户
     * @param admin 管理员数据
     * @return 受影响的行数
     * */
    Integer updateAdmin(Admin admin);
}
