package com.forestsoul.forestsoullibrary.service.Impl;

import com.forestsoul.forestsoullibrary.entity.Admin;
import com.forestsoul.forestsoullibrary.entity.Customer;
import com.forestsoul.forestsoullibrary.mapper.CustomerMapper;
import com.forestsoul.forestsoullibrary.service.CustomerService;
import com.forestsoul.forestsoullibrary.service.exception.*;
import com.forestsoul.forestsoullibrary.util.MD5;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerMapper customerMapper;

    @Override
    public void reg(Customer customer) {
        //通过形参获取 customer_login 和 customer_delete
        String customerName = customer.getCustomerLogin();
        // 调用 findByName() 判断用户是否被注册
        Customer result = customerMapper.findByName(customerName);

        //判断结果集是否为空且账号未被定义为已删除
        if (result == null || result.getCustomerDelete() != 0){
            //补全数据
            customer.setCustomerDelete(0);
            Date date = new Date();
            customer.setCustomerDate(date);
            customer.setCustomerIcon("/upload/default_icon.png");
            customer.setCustomerBookCount(0);
            customer.setCustomerPriceCount(new BigDecimal("0.00"));
            //密码加密
            String password = customer.getCustomerPassword();
            //获取盐值并储存
            String salt = UUID.randomUUID().toString().toUpperCase();
            customer.setCustomerSalt(salt);
            //将密码和盐值作为一个整体进行加密
            String MD5Password = MD5.getMD5(password,salt);
            customer.setCustomerPassword(MD5Password);
            //执行注册业务的实现
            Integer rows = customerMapper.insert(customer);
            if (rows != 1){
                throw  new InsertException("在用户注册过程中产生了未知的异常");
            }
        }else{
            throw new CustomerNameDuplicatedException("用户已被使用");
        }

    }

    @Override
    public Customer login(String customerLogin, String password) {
        //根据用户名来查询用户数据是否存在，如果不存在则抛出异常
        Customer result = customerMapper.findByName(customerLogin);

        if (result == null || result.getCustomerDelete() !=0){
            throw new CustomerNotFoundException("用户数据不存在");
        }

        String CPassword = result.getCustomerPassword();
        String CSalt = result.getCustomerSalt();
        password = MD5.getMD5(password,CSalt);
        if (!password.equals(CPassword) ){
            throw  new PasswordNotMatchException("用户密码错误");
        }

        Customer customer = new Customer();
        customer.setCustomerId(result.getCustomerId());
        customer.setCustomerLogin(result.getCustomerLogin());
        customer.setCustomerName(result.getCustomerName());
        customer.setCustomerIcon(result.getCustomerIcon());
        customer.setCustomerEmail(result.getCustomerEmail());
        return customer;
    }

    @Override
    public Integer selectByLogin(Customer customer) {
        String customerLogin = customer.getCustomerLogin();
        // 调用 findByName() 判断用户是否被注册
        Customer result = customerMapper.findByName(customerLogin);

        if (result == null || result.getCustomerDelete() != 0){
            return 0;
        }
        return 1;
    }

    @Override
    public void changePassword(Integer customersId, String oldPassword, String newPassword) {
        Customer result = customerMapper.findById(customersId);
        if (result == null){
            throw new CustomerNotFoundException("用户数据不存在");
        }

        String salt = result.getCustomerSalt();
        oldPassword = MD5.getMD5(oldPassword,salt);
        if (!oldPassword.equals(result.getCustomerPassword())){
            throw new PasswordNotMatchException("密码错误");
        }

        newPassword = MD5.getMD5(newPassword,salt);
        Integer rows = customerMapper.updatePasswordById(customersId,newPassword);

        if (rows != 1){
            throw new UpdateException("更新数据产生异常");
        }
    }

    @Override
    public Customer getById(Integer customerId) {
        Customer result = customerMapper.findById(customerId);
        if (result == null || result.getCustomerDelete() == 1){
            throw new CustomerNotFoundException("用户数据不存在");
        }
        Customer customer = new Customer();
        customer.setCustomerId(result.getCustomerId());
        customer.setCustomerLogin(result.getCustomerLogin());
        customer.setCustomerName(result.getCustomerName());
        customer.setCustomerIcon(result.getCustomerIcon());
        customer.setCustomerEmail(result.getCustomerEmail());
        customer.setCustomerBookCount(result.getCustomerBookCount());
        customer.setCustomerPriceCount(result.getCustomerPriceCount());
        return customer;
    }

    @Override
    public void changeInfo(Integer customerId, Customer customer) {
        Customer result = customerMapper.findById(customerId);
        if (result == null || result.getCustomerDelete() == 1){
            throw new CustomerNotFoundException("用户数据不存在");
        }

        customer.setCustomerId(customerId);

        Integer rows = customerMapper.updateInfoById(customer);
        if (rows != 1){
            throw new UpdateException("更新数据时产生未知错误");
        }
    }

    @Override
    public void changeIcon(Integer customerId, String customerIcon) {
        Customer result = customerMapper.findById(customerId);
        if (result == null || result.getCustomerDelete() == 1){
            throw new CustomerNotFoundException("用户数据不存在");
        }

        Integer rows = customerMapper.updateIconById(customerId, customerIcon);
        if (rows != 1){
            throw new UpdateException("更新数据时产生未知错误");
        }
    }

    @Override
    public List<Customer> getAllCustomer() {
        return customerMapper.getAllCustomer();
    }

    @Override
    public PageInfo<Customer> getPageInfo(String keyword, Integer pageNum, Integer pageSize) {
        //调用 pageHelper 的静态方法开启分页功能
        PageHelper.startPage(pageNum,pageSize);

        List<Customer> list = customerMapper.getByKeyword(keyword);

        return new  PageInfo<>(list);
    }

    @Override
    public void updateBookCount(Integer customerId, Integer bookCount, BigDecimal bookPrice) {
        Customer customer = customerMapper.findById(customerId);
        Integer count = customer.getCustomerBookCount();
        BigDecimal priceCount = customer.getCustomerPriceCount();
        count += bookCount;
        priceCount = priceCount.add(bookPrice);
        Integer rows = customerMapper.updateBookCount(customerId, count, priceCount);
        if (rows != 1){
            throw new UpdateException("更新时出现未知异常");
        }
    }

    @Override
    public void updateCustomer(Integer customerId, Customer customer) {
        Customer byId = customerMapper.findById(customerId);
        String salt = byId.getCustomerSalt();

        String password = customer.getCustomerPassword();
        password = MD5.getMD5(password,salt);

        customer.setCustomerId(customerId);
        customer.setCustomerPassword(password);

        Integer rows = customerMapper.updateCustomer(customer);
        if (rows != 1){
            throw new UpdateException("更新时出现未知异常");
        }
    }

    @Override
    public void deleteCustomer(Integer customerId) {
        Integer rows = customerMapper.deleteCustomer(customerId);
        if (rows != 1){
            throw new UpdateException("更新时出现未知异常");
        }
    }
}
