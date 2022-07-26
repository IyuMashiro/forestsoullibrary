package com.forestsoul.forestsoullibrary.service;

import com.forestsoul.forestsoullibrary.entity.Address;
import com.forestsoul.forestsoullibrary.mapper.AddressMapper;

import java.util.List;

public interface AddressService {
    /**
     * 添加新地址
     * @param customerId 用户 id
     * @param address 收货地址数据
    * */
    void addNewAddress(Integer customerId, Address address);

    /**
     * 根据用户 id 查询所有收货地址数据
     * @param customerId 用户 id
     * @return 收货地址数据集合
     * */
    List<Address> getById(Integer customerId);

    /**
     * 修改某个用户的地址为默认地址
     * @param addressId Aid
     * @param customerId 用户 Id
     * */
    void setDefault(Integer addressId,Integer customerId);

    /**
     * 删除收货地址
     * @param addressId Aid
     * @param customerId 用户 Id
     * */
    void delete(Integer addressId,Integer customerId);

    /**
     * 修改某个用户的地址为默认地址
     * @param addressId Aid
     * @param customerId 用户 Id
     * @param oldAddress 原收货地址数据
     * @param newAddress 新收货数据
     * */
    void update(Integer addressId,Integer customerId ,Address oldAddress,Address newAddress);

    /**
     * 根据 aid 查询收货地址
     * @param addressId Aid
     * @return 收货地址数据
     * */
    Address findByAId(Integer addressId);

    /**
     * 根据 aid 查询收货地址
     * @param cityCode 城市代码
     * @return parentId
     * */
    Integer getParentId(Integer cityCode);
}
