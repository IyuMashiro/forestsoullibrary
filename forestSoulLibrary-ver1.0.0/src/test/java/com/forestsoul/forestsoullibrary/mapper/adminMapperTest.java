package com.forestsoul.forestsoullibrary.mapper;

import com.forestsoul.forestsoullibrary.entity.Admin;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;


@SpringBootTest
public class adminMapperTest {

    @Autowired
    private AdminMapper adminMapper;

    @Test
    public void testFindByAcct(){
        Admin admin = adminMapper.findByAcct("admin");
        System.out.println(admin);
    }

    @Test
    public void testGetAll(){
        List<Admin> list = adminMapper.getAll();
        for (Admin admin:list){
            System.out.println(admin);
        }
    }
}
