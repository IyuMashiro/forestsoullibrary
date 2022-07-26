package com.forestsoul.forestsoullibrary.mapper;

import com.forestsoul.forestsoullibrary.entity.Customer;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class CustomerMapperTests {

    @Autowired
    private  CustomerMapper customerMapper;

    @Test
    public void testInsert(){
        Customer customer = new Customer();
        customer.setCustomerLogin("tom");
        customer.setCustomerPassword("123456");
        customer.setCustomerName("Tom");
        Integer rows = customerMapper.insert(customer);
        System.out.println(rows);
    }

    @Test
    public void testSelect(){
        Customer customer = customerMapper.findByName("admin");
        System.out.println(customer);
    }

    @Test
    public void testFindById(){
        Customer result = customerMapper.findById(1);
        System.out.println(result);
    }

    @Test
    public void testUpdatePassword(){
        customerMapper.updatePasswordById(8,"qwertyui");
    }

    @Test
    public void testUpdateById(){
        Customer customer = new Customer();
        customer.setCustomerId(8);
        customer.setCustomerName("jacker");
        customer.setCustomerEmail("jacker@forest.com");
        customerMapper.updateInfoById(customer);
    }

    @Test
    public void testUpdateIcon(){
        customerMapper.updateIconById(5,"/img/123.jpg");
    }

    @Test
    public void testGetAll(){
        List<Customer> list = customerMapper.getAllCustomer();
        for (Customer customer: list){
            System.out.println(customer);
        }
    }
}
