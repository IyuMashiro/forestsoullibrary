package com.forestsoul.forestsoullibrary.service;

import com.forestsoul.forestsoullibrary.entity.Customer;
import com.forestsoul.forestsoullibrary.mapper.CustomerMapper;
import com.forestsoul.forestsoullibrary.service.exception.ServiceException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class CustomerServiceTest {

    @Autowired
    private CustomerService customerService;

    @Test
    public void reg(){
        try {
            Customer customer = new Customer();
            customer.setCustomerLogin("admin");
            customer.setCustomerName("iyu");
            customer.setCustomerPassword("123456");
            customerService.reg(customer);
            System.out.println("OK");
        } catch (ServiceException e) {
            //获取类的名称
            System.out.println(e.getClass().getSimpleName());
            //获取异常的具体信息
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Test
    public void login(){
        Customer customer = customerService.login("admin","123456");
        System.out.println(customer);

    }

    @Test
    public void testChangePw(){
        customerService.changePassword(8,"qwertyui","qwerqwer");
    }

    @Test
    public void testGetById(){
        Customer result = customerService.getById(1);
        System.out.println(result);
    }

    @Test
    public void testUpdateInfo(){
        Customer customer = new Customer();
        customer.setCustomerName("Jackson");
        customer.setCustomerEmail("Jackson@forest.com");
        customerService.changeInfo(8,customer);
    }

    @Test
    public void testUpdateIcno(){
        customerService.changeIcon(5,"/img/jack.jpg");
    }
}
