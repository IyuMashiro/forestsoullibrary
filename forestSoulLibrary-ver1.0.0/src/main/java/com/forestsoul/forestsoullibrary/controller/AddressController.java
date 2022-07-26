package com.forestsoul.forestsoullibrary.controller;


import com.forestsoul.forestsoullibrary.entity.Address;
import com.forestsoul.forestsoullibrary.service.AddressService;
import com.forestsoul.forestsoullibrary.service.CityService;
import com.forestsoul.forestsoullibrary.util.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("address")
public class AddressController extends BaseController{

    @Autowired
    private AddressService addressService;

    @Autowired
    private CityService cityService;


    @RequestMapping(value = "addAddress")
    public JsonResult<Void> addNewAddress(Address address, HttpSession session){
        Integer id = getIdFromSession(session);
        addressService.addNewAddress(id,address);
        return new JsonResult<>(OK);
    }

    @RequestMapping({"","/"})
    public JsonResult<List<Address>> getById(HttpSession session){
        Integer id = getIdFromSession(session);
        List<Address> list = addressService.getById(id);
        return new JsonResult<>(OK,list);
    }

    @RequestMapping("{addressId}/setDefault")
    public JsonResult<Void> setDefault(@PathVariable("addressId") Integer addressId ,HttpSession session){
        Integer id = getIdFromSession(session);
        addressService.setDefault(addressId,id);
        return new JsonResult<>(OK);
    }

    @RequestMapping("{addressId}/delete")
    public JsonResult<Void> delete(@PathVariable("addressId") Integer addressId,HttpSession session){
        addressService.delete(addressId,getIdFromSession(session));
        return new  JsonResult<>(OK);
    }

    @ResponseBody
    @RequestMapping("{addressId}/toUpdate")
    public ModelAndView toUpdate(@PathVariable("addressId") Integer addressId,HttpSession session){
        ModelAndView modelAndView = new ModelAndView();
        Address result = addressService.findByAId(addressId);
        Integer provinceId = cityService.getIdByCode(result.getProvinceCode());
        Integer cityId = cityService.getIdByCode(result.getCityCode());
        Integer areaId = cityService.getIdByCode(result.getAreaCode());
        modelAndView.addObject("name",result.getAddressName());
        modelAndView.addObject("phone",result.getAddressPhone());
        modelAndView.addObject("province",result.getProvinceName());
        modelAndView.addObject("city",result.getCityName());
        modelAndView.addObject("area",result.getAreaName());
        modelAndView.addObject("provinceId",provinceId);
        modelAndView.addObject("cityId",cityId);
        modelAndView.addObject("areaId",areaId);
        modelAndView.addObject("address",result.getAddressPosition());
        modelAndView.addObject("addressId",addressId);


        modelAndView.setViewName("customer-Info-updateAddress");
        return modelAndView;
    }

    @ResponseBody
    @RequestMapping("{addressId}/indentToUpdate")
    public ModelAndView indentToUpdate(@PathVariable("addressId") Integer addressId,HttpSession session){
        ModelAndView modelAndView = new ModelAndView();
        Address result = addressService.findByAId(addressId);
        Integer provinceId = cityService.getIdByCode(result.getProvinceCode());
        Integer cityId = cityService.getIdByCode(result.getCityCode());
        Integer areaId = cityService.getIdByCode(result.getAreaCode());
        modelAndView.addObject("name",result.getAddressName());
        modelAndView.addObject("phone",result.getAddressPhone());
        modelAndView.addObject("province",result.getProvinceName());
        modelAndView.addObject("city",result.getCityName());
        modelAndView.addObject("area",result.getAreaName());
        modelAndView.addObject("provinceId",provinceId);
        modelAndView.addObject("cityId",cityId);
        modelAndView.addObject("areaId",areaId);
        modelAndView.addObject("address",result.getAddressPosition());
        modelAndView.addObject("addressId",addressId);


        modelAndView.setViewName("customer-indent-updateAddress");
        return modelAndView;
    }

    @RequestMapping("{addressId}/update")
    public JsonResult<Void> update(@PathVariable("addressId") Integer addressId,Address address,HttpSession session){
        Integer id = getIdFromSession(session);
        Address oldAddress = addressService.findByAId(addressId);
        addressService.update(addressId,id,oldAddress,address);
        return new JsonResult<>(OK);
    }

}
