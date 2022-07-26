package com.forestsoul.forestsoullibrary.controller;

import com.forestsoul.forestsoullibrary.entity.City;
import com.forestsoul.forestsoullibrary.service.CityService;
import com.forestsoul.forestsoullibrary.util.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("city")
public class CityController extends BaseController{

    @Autowired
    private CityService cityService;

    @RequestMapping({"/",""})
    public JsonResult<List<City>> getByParent(Integer parentId){
        List<City> cityList = cityService.getByParent(parentId);
        return new JsonResult<>(OK,cityList);
    }


}
