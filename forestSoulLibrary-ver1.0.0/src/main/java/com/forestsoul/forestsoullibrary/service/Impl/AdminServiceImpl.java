package com.forestsoul.forestsoullibrary.service.Impl;

import com.forestsoul.forestsoullibrary.entity.Admin;
import com.forestsoul.forestsoullibrary.mapper.AdminMapper;
import com.forestsoul.forestsoullibrary.service.AdminService;
import com.forestsoul.forestsoullibrary.service.exception.*;
import com.forestsoul.forestsoullibrary.util.MD5;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminMapper adminMapper;
    @Override
    public Admin login(String loginAcct, String password) {
        Admin result = adminMapper.findByAcct(loginAcct);
        if (result == null){
            throw new AdminNotFoundException("用户数据不存在");
        }

        String CPassword = result.getPassword();
        String CSalt = result.getSalt();
        password = MD5.getMD5(password,CSalt);
        if (!password.equals(CPassword) ){
            throw  new PasswordNotMatchException("用户密码错误");
        }

       Admin admin = new Admin();
        admin.setId(result.getId());
        admin.setLoginAcct(result.getLoginAcct());
        admin.setCreate_date(result.getCreate_date());
        admin.setState(result.getState());
        admin.setLeven(result.getLeven());
        return admin;
    }

    @Override
    public Admin findById(Integer id) {
        Admin result = adminMapper.findById(id);
        if (result == null){
            throw new AdminNotFoundException("用户数据不存在");
        }

        Admin admin = new Admin();
        admin.setId(result.getId());
        admin.setLoginAcct(result.getLoginAcct());
        admin.setCreate_date(result.getCreate_date());
        admin.setState(result.getState());
        admin.setLeven(result.getLeven());
        return admin;
    }

    @Override
    public List<Admin> getAll() {
        return adminMapper.getAll();
    }

    @Override
    public PageInfo<Admin> getPageInfo(String keyword, Integer pageNum, Integer pageSize) {
        //调用 pageHelper 的静态方法开启分页功能
        PageHelper.startPage(pageNum,pageSize);

        List<Admin> list = adminMapper.getByKeyword(keyword);

        return new  PageInfo<>(list);
    }

    @Override
    public void deleteAdmin(Integer id) {
        Integer rows = adminMapper.deleteAdmin(id);
        if (rows != 1){
            throw new DeleteException("删除时出现异常");
        }
    }

    @Override
    public void addAdmin(Admin admin) {
        String password = admin.getPassword();
        String salt = UUID.randomUUID().toString().toUpperCase();
        admin.setLeven(2);
        admin.setCreate_date(new Date());
        password = MD5.getMD5(password,salt);
        admin.setPassword(password);
        admin.setDelete(0);
        admin.setSalt(salt);
        admin.setState(0);
        Integer rows = adminMapper.addAdmin(admin);
        if (rows != 1){
            throw new InsertException("新增数据出现未知异常");
        }
    }

    @Override
    public void updateAdmin(Integer id, Admin admin) {
        admin.setId(id);
        String password = admin.getPassword();
        Admin byId = adminMapper.findById(id);
        String salt = byId.getSalt();
        password = MD5.getMD5(password,salt);
        admin.setPassword(password);
        Integer rows = adminMapper.updateAdmin(admin);
        if (rows != 1){
            throw new UpdateException("更新数据出现未知异常");
        }
    }
}
