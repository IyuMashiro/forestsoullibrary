package com.forestsoul.forestsoullibrary.service.Impl;

import com.forestsoul.forestsoullibrary.entity.Address;
import com.forestsoul.forestsoullibrary.mapper.AddressMapper;
import com.forestsoul.forestsoullibrary.mapper.CityMapper;
import com.forestsoul.forestsoullibrary.service.AddressService;
import com.forestsoul.forestsoullibrary.service.exception.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressMapper addressMapper;

    @Autowired
    private CityMapper cityMapper;

    @Value("${customer.address.max-count}")
    private Integer maxCount;

    @Override
    public void addNewAddress(Integer customerId, Address address) {
        Integer count = addressMapper.countById(customerId);
        if (count >= maxCount){
            throw new AddressCountLimitException("地址数超出上限");
        }

        //设置 customerId 并判断是否是第一条地址数据如果是设为默认地址
        address.setCustomerId(customerId);
        Integer isDefault = count == 0 ?1:0;
        address.setAddressDefault(isDefault);

        Integer provinceCode = cityMapper.findCodeById(address.getProvinceCode());
        Integer cityCode = cityMapper.findCodeById(address.getCityCode());
        Integer areaCode = cityMapper.findCodeById(address.getAreaCode());
        String provinceName = cityMapper.findNameById(address.getProvinceCode());
        String cityName = cityMapper.findNameById(address.getCityCode());
        String areaName = cityMapper.findNameById(address.getAreaCode());

        //补全数据
        address.setAddressName(address.getAddressName());
        address.setProvinceName(provinceName);
        address.setProvinceCode(provinceCode);
        address.setCityName(cityName);
        address.setCityCode(cityCode);
        address.setAreaName(areaName);
        address.setAreaCode(areaCode);
        address.setAddressPosition(address.getAddressPosition());
        address.setAddressPhone(address.getAddressPhone());

        Integer rows = addressMapper.insert(address);
        if (rows != 1){
            throw new InsertException("插入收货地址时出现异常");
        }
    }

    @Override
    public List<Address> getById(Integer customerId) {
        List<Address> addressList = addressMapper.findById(customerId);
        return addressList;
    }

    @Override
    public void setDefault(Integer addressId, Integer customerId) {
        Address result = addressMapper.findByAId(addressId);
        if (result == null){
            throw new AddressNotFoundException("收货地址不存在");
        }
        if (!customerId.equals(result.getCustomerId())){
            throw new AccessDeniedException("非法数据访问");
        }

        Integer rows = addressMapper.updateNonDefault(customerId);
        if (rows < 1){
            throw new UpdateException("更新数据时产生异常");
        }

        rows = addressMapper.updateDefaultByAid(addressId);
        if (rows != 1){
            throw new UpdateException("更新数据时产生异常");
        }
    }

    @Override
    public void delete(Integer addressId, Integer customerId) {
        Address result = addressMapper.findByAId(addressId);
        if (result == null){
            throw new AddressNotFoundException("收货地址不存在");
        }
        if (!customerId.equals(result.getCustomerId())){
            throw new AccessDeniedException("非法数据访问");
        }


        Integer rows = addressMapper.deleteByAId(addressId);

        if (rows != 1){
            throw new DeleteException("删除数据产生未知异常");
        }
        Integer count = addressMapper.countById(customerId);
        if (count == 0){
            return;
        }

        if (result.getAddressDefault() == 1){
            Address address = addressMapper.findFirstAid(customerId);
            rows = addressMapper.updateDefaultByAid(address.getAddressId());
        }

        if (rows!= 1){
            throw new UpdateException("更新数据时产生未知异常");
        }

    }

    @Override
    public void update(Integer addressId, Integer customerId, Address oldAddress,Address newAddress) {
        Address result = addressMapper.findByAId(addressId);
        if (result == null){
            throw new AddressNotFoundException("收货地址不存在");
        }
        if (!customerId.equals(result.getCustomerId())){
            throw new AccessDeniedException("非法数据访问");
        }

        Integer provinceCode = cityMapper.findCodeById(newAddress.getProvinceCode());
        Integer cityCode = cityMapper.findCodeById(newAddress.getCityCode());
        Integer areaCode = cityMapper.findCodeById(newAddress.getAreaCode());
        String provinceName = cityMapper.findNameById(newAddress.getProvinceCode());
        String cityName = cityMapper.findNameById(newAddress.getCityCode());
        String areaName = cityMapper.findNameById(newAddress.getAreaCode());

        //补全数据
        oldAddress.setAddressName(newAddress.getAddressName());
        oldAddress.setProvinceName(provinceName);
        oldAddress.setProvinceCode(provinceCode);
        oldAddress.setCityName(cityName);
        oldAddress.setCityCode(cityCode);
        oldAddress.setAreaName(areaName);
        oldAddress.setAreaCode(areaCode);
        oldAddress.setAddressPosition(newAddress.getAddressPosition());
        oldAddress.setAddressPhone(newAddress.getAddressPhone());

        Integer rows = addressMapper.updateByAid(oldAddress);

        if (rows!= 1){
            throw new UpdateException("更新数据时产生未知异常");
        }

    }

    @Override
    public Address findByAId(Integer addressId) {
        Address address = addressMapper.findByAId(addressId);
        if (address == null){
            throw new  AddressNotFoundException("收货地址不存在");
        }
        return address;
    }

    @Override
    public Integer getParentId(Integer cityCode) {
        cityMapper.findCodeById(cityCode);
        return null;
    }
}
