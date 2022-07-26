package com.forestsoul.forestsoullibrary.mapper;

import com.forestsoul.forestsoullibrary.entity.City;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CityMapper{
    /**
     * 根据 父代号查询区域信息
     * @param parentId 父代号
     * @return 某个父区域下的所有区域
     * */
    List<City> findByParent(Integer parentId);

    /**
     * 根据  id 查询区域 Code
     * @param id 名
     * @return 区域 Code
     * */

    Integer findCodeById(Integer id);

    /**
     * 根据  id 查询区域名
     * @param id 名
     * @return 区域名
     * */
    String findNameById(Integer id);


    /**
     * 根据  code 查询 id
     * @param code 区域代码
     * @return 区域 id
     * */
    Integer findIdByCode(Integer code);


}
