package com.forestsoul.forestsoullibrary.controller;


import com.forestsoul.forestsoullibrary.entity.Admin;
import com.forestsoul.forestsoullibrary.service.AdminService;
import com.forestsoul.forestsoullibrary.util.JsonResult;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("admin")
public class AdminController extends BaseController{

    @Autowired
    private AdminService adminService;

    @RequestMapping(value = "login")
    public JsonResult<Admin> login(String loginAcct , String password, HttpSession session){
        Admin data = adminService.login(loginAcct,password);
        session.setAttribute("AdminId",data.getId());
        session.setAttribute("AdminAcct",data.getLoginAcct());
        return new JsonResult<>(OK,data);
    }

    @RequestMapping(value = "getData")
    public JsonResult<Admin> getData(HttpSession session){
        Integer id = getAdminIdFromSession(session);
        Admin data = adminService.findById(id);
        return new JsonResult<>(OK,data);
    }

    @RequestMapping(value = "logout")
    public String logout(HttpSession session, SessionStatus sessionStatus){
        session.invalidate();
        sessionStatus.setComplete();
        return "redirect:admin-login.html";
    }

    @RequestMapping(value = "getAllAdmin")
    public JsonResult<List<Admin>> getAllAdmin(){
        List<Admin> list = adminService.getAll();
        return new JsonResult<>(OK,list);
    }

    @RequestMapping(value = "getPage")
    public JsonResult<PageInfo<Admin>> getPage(@RequestParam(value = "keyword" ,defaultValue = "") String keyword,
                                               @RequestParam(value = "pageNum",defaultValue = "1") Integer pageNum,
                                               @RequestParam(value = "pageSize",defaultValue = "5") Integer pageSize){
        PageInfo<Admin> pageInfo = adminService.getPageInfo(keyword, pageNum, pageSize);
        List<Admin> data = pageInfo.getList();
        return new JsonResult<>(OK,pageInfo);
    }

    @RequestMapping("delete")
    public JsonResult<Void> delete(Integer id){
        adminService.deleteAdmin(id);
        return new JsonResult<>(OK);
    }

    @RequestMapping("add")
    public JsonResult<Void> add(Admin admin){
        adminService.addAdmin(admin);
        return new JsonResult<>(OK);
    }

    @RequestMapping("update")
    public JsonResult<Void> update(Integer id,Admin admin) {
        adminService.updateAdmin(id, admin);
        return new JsonResult<>(OK);
    }
}
