package com.forestsoul.forestsoullibrary.mapper;

import com.forestsoul.forestsoullibrary.entity.Address;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AddressMapper {
    /**
     * 插入用户数据
     * @param address 收货地址数据
     * @return 收影响的行数
     *
     * */
    Integer insert(Address address);

    /**
     * 根据用户 id 统计收货地址数
     * @param customerId  用户 id
     * @return 当前用户的收货地址总数
     * */
    Integer countById(Integer customerId);

    /**
     * 根据用户 id 查询用户所有的收货地址
     * @param customerId 用户 id
     * @return 收货地址数据
     * */
    List<Address> findById(Integer customerId);

    /**
     * 根据 AId 查询收货地址数据
     * @param addressId AId
     * @return 收货地址数据
     * */
    Address findByAId(Integer addressId);

    /**
     * 根据用户 id 修改该用户的所有收货地址为非默认
     * @param customerId 用户 id
     * @return 受影响的行数
     * */
    Integer updateNonDefault(Integer customerId);

    /**
     * 根据用户 AId 修改收货地址为默认地址
     * @param addressId AId
     * @return 受影响的行数
     * */
    Integer updateDefaultByAid(Integer addressId);

    /**
     * 根据收货地址 id 删除收货地址数据
     * @param addressId Aid
     * @return 受影响的行数
     * */
    Integer deleteByAId(Integer addressId);

    /**
     * 根据用户 id 查询 aid 为第一个的收货地址数据
     * @param customerId 用户 id
     * @return 收货地址数据
     * */
    Address findFirstAid(Integer customerId);

    /**
     * 更新收货数据
     * @param address 收货地址数据
     * @return 收货地址数据
     * */
    Integer updateByAid(Address address);
}
