package com.forestsoul.forestsoullibrary.service;

import com.forestsoul.forestsoullibrary.entity.Admin;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class AdminServiceTest {

    @Autowired
    private AdminService adminService;

    @Test
    public void testLogin(){
        Admin login = adminService.login("admin", "1");
        System.out.println(login);
    }

    @Test
    public void lestGetAllAdmin(){
        List<Admin> list = adminService.getAll();
        for (Admin admin:list){
            System.out.println(admin);
        }
    }
}
