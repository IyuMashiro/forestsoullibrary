package com.forestsoul.forestsoullibrary.service;

import com.forestsoul.forestsoullibrary.entity.City;

import java.util.List;

public interface CityService {

    /**
     * 根据父 id 查询区域信息
     * @param parentId 父 id
     * @return 区域信息
     * */
    List<City> getByParent(Integer parentId);

    /**
     * 根据 id 查询区域名称
     * @param id 区域 id
     * @return 区域名称
     * */
    String getNameById(Integer id);

    /**
     * 根据 code 查询区域 id
     * @param code 区域代码
     * @return 区域 id
     * */
    Integer getIdByCode(Integer code);
}
