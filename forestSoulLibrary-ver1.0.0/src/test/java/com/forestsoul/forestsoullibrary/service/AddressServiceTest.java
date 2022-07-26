package com.forestsoul.forestsoullibrary.service;

import com.forestsoul.forestsoullibrary.entity.Address;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class AddressServiceTest {

    @Autowired
    private AddressService addressService;

    @Test
    public void testAddNewAddress(){
        Address address = new Address();
        address.setAddressName("jack");
        address.setProvinceName("四川");
        address.setProvinceCode(000002);
        address.setCityName("武汉");
        address.setCityCode(000002);
        address.setAreaName("武侯区");
        address.setAreaCode(000003);
        address.setAddressPosition("森灵街道");
        address.setAddressPhone("12344445555");
        addressService.addNewAddress(5,address);
    }

    @Test
    public void testSetDefault(){
        addressService.setDefault(6,5);
    }

    @Test
    public void testDelete(){
        addressService.delete(7,5);
    }

    @Test
    public void testFindByAid(){
        Address address = addressService.findByAId(8);
        System.out.println(address);
    }

    @Test
    public void testUpdate(){
        Address oldAddress = addressService.findByAId(12);
        Address address = new Address();
        address.setAddressName("jacker");
        address.setProvinceCode(10000001);
        address.setCityCode(10000001);
        address.setAreaCode(10000001);
        address.setAddressPosition("森灵街道");
        address.setAddressPhone("12344445555");
        addressService.update(12,5,oldAddress,address);
    }
}
