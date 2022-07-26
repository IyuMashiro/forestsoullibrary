package com.forestsoul.forestsoullibrary.mapper;

import com.forestsoul.forestsoullibrary.entity.Address;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class AddressMapperTest {

    @Autowired
    private AddressMapper addressMapper;

    @Test
    public void testInsert(){
        Address address = new Address();
        address.setCustomerId(8);
        address.setAddressName("jack");
        address.setProvinceName("湖南");
        address.setProvinceCode(000001);
        address.setCityName("长沙");
        address.setCityCode(000001);
        address.setAreaName("芙蓉区");
        address.setAreaCode(000001);
        address.setAddressPosition("森灵街道");
        address.setAddressPhone("12344445555");
        address.setAddressDefault(1);

        addressMapper.insert(address);
    }

    @Test
    public void testCountById(){
        Integer result = addressMapper.countById(5);
        System.out.println(result);
    }

    @Test
    public void testFindById(){
        List<Address> list = addressMapper.findById(5);
        for (Address address: list){
            System.out.println(address);
        }
    }

    @Test
    public void testFindByAId(){
        Address result = addressMapper.findByAId(5);
        System.out.println(result);
    }

    @Test
    public void testUpdateNonDefault(){
        Integer rows = addressMapper.updateNonDefault(5);
        System.out.println(rows);
    }

    @Test
    public void testUpdateDefault(){
        Integer rows = addressMapper.updateDefaultByAid(5);
        System.out.println(rows);
    }

    @Test
    public void testFindFirstAid(){
        Address result = addressMapper.findFirstAid(5);
        System.out.println(result);
    }

    @Test
    public void testDeleteAddress(){
        addressMapper.deleteByAId(6);
    }

    @Test
    public void testUpdate(){
        Address address = new Address();
        address.setAddressId(11);
        address.setCustomerId(1);
        address.setAddressName("iyu");
        address.setProvinceName("湖南");
        address.setProvinceCode(000001);
        address.setCityName("长沙");
        address.setCityCode(000001);
        address.setAreaName("芙蓉区");
        address.setAreaCode(000001);
        address.setAddressPosition("森灵街道");
        address.setAddressPhone("12344445555");
        address.setAddressDefault(1);
        System.out.println(address);
        addressMapper.updateByAid(address);
    }
}
