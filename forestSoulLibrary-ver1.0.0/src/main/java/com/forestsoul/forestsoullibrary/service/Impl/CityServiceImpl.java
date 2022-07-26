package com.forestsoul.forestsoullibrary.service.Impl;

import com.forestsoul.forestsoullibrary.entity.City;
import com.forestsoul.forestsoullibrary.mapper.CityMapper;
import com.forestsoul.forestsoullibrary.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityServiceImpl implements CityService {

    @Autowired
    private CityMapper cityMapper;

    @Override
    public List<City> getByParent(Integer parentId) {
        List<City> cityList = cityMapper.findByParent(parentId);
        return cityList;
    }

    @Override
    public String getNameById(Integer code) {
        return cityMapper.findNameById(code);
    }

    @Override
    public Integer getIdByCode(Integer code) {
        return cityMapper.findIdByCode(code);
    }
}
