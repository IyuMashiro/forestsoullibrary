package com.forestsoul.forestsoullibrary.controller;

import com.forestsoul.forestsoullibrary.entity.Admin;
import com.forestsoul.forestsoullibrary.entity.Customer;
import com.forestsoul.forestsoullibrary.service.CustomerService;
import com.forestsoul.forestsoullibrary.service.exception.*;
import com.forestsoul.forestsoullibrary.util.JsonResult;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("customer")
public class CustomerController extends BaseController{

    @Autowired
    private CustomerService customerService;

    @RequestMapping(value = "reg")
    public JsonResult<Void> reg(Customer customer){
        //创建响应对象
        customerService.reg(customer);
        return new JsonResult<>(OK);
    }

    @RequestMapping("selectByLogin")
    public JsonResult<Integer> selectByLogin(Customer customer){
        Integer data = customerService.selectByLogin(customer);
        if (data == 1){
            return new JsonResult<>(5000);
        }
        return new JsonResult<>(OK);
    }

    @RequestMapping(value = "login")
    public JsonResult<Customer> login(String customerLogin , String CustomerPassword, HttpSession session){
        Customer data = customerService.login(customerLogin,CustomerPassword);
        session.setAttribute("customerId",data.getCustomerId());
        session.setAttribute("customerName",data.getCustomerName());
        return new JsonResult<>(OK,data);
    }

    @RequestMapping(value = "changePassword")
    public JsonResult<Void> changePassword(String oldPassword,String newPassword,HttpSession session){
        Integer id = getIdFromSession(session);
        customerService.changePassword(id,oldPassword,newPassword);
        return new JsonResult<>(OK);
    }

    @RequestMapping("getById")
    public JsonResult<Customer> getById(HttpSession session){
        if (session.getAttribute("customerId") == null){
            return new JsonResult<>(5010);
        }
        Customer data = customerService.getById(getIdFromSession(session));
        return new JsonResult<Customer>(OK,data);
    }

    @RequestMapping(value = "getAllCustomer")
    public JsonResult<List<Customer>> getAll(){
        List<Customer> data = customerService.getAllCustomer();
        return new JsonResult<>(OK,data);
    }

    @RequestMapping(value = "getPage")
    public JsonResult<PageInfo<Customer>> getPage(@RequestParam(value = "keyword" ,defaultValue = "") String keyword,
                                               @RequestParam(value = "pageNum",defaultValue = "1") Integer pageNum,
                                               @RequestParam(value = "pageSize",defaultValue = "5") Integer pageSize){
        PageInfo<Customer> pageInfo = customerService.getPageInfo(keyword, pageNum, pageSize);
        List<Customer> data = pageInfo.getList();
        return new JsonResult<>(OK,pageInfo);
    }

    @ResponseBody
    @RequestMapping(value = "logout")
    public void logout(HttpSession session, SessionStatus sessionStatus, HttpServletResponse response) throws IOException {
        session.invalidate();
        sessionStatus.setComplete();
        response.sendRedirect("/web/login.html");

    }

    @RequestMapping("changeInfo")
    public JsonResult<Void> changeInfo(Customer customer,HttpSession session){
        Integer id = getIdFromSession(session);
        customerService.changeInfo(id,customer);
        return new JsonResult<>(OK);
    }

    //头像图片最大值
    public static final int ICON_MAX_SIZE = 10 * 1024 * 1024;
    //限制文件类型
    public static final List<String > ICON_TYPE = new ArrayList<>();
    static {
        ICON_TYPE.add("image/jpeg");
        ICON_TYPE.add("image/png");
        ICON_TYPE.add("image/bmp");
        ICON_TYPE.add("image/gif");
        ICON_TYPE.add("image/jpg");
    }

    @RequestMapping(value = "changeIcon")
    public JsonResult<String> changeIcon(HttpSession session, @RequestParam("file") MultipartFile file){
        if (file == null){
            throw new FileEmptyException("文件为空");
        }
        if (file.getSize() > ICON_MAX_SIZE){
            throw new FileSizeException("文件大小超出限制");
        }
        String contentType = file.getContentType();
        if (!ICON_TYPE.contains(contentType)){
            throw new FileTypeException("文件类型错误");
        }

        String parent = session.getServletContext().getRealPath("upload");

        File dir = new File("target/classes/static/upload");
        if (!dir.exists()){
            dir.mkdirs();
        }
        String originalFilename = file.getOriginalFilename();
        int index = originalFilename.lastIndexOf(".");
        String suffix = originalFilename.substring(index);
        String fileName = UUID.randomUUID().toString().toUpperCase()+suffix;
        File dest = new File(dir.getAbsoluteFile(),fileName);
        try {
            file.transferTo(dest);
        }catch (FileStateException e){
            throw new FileStateException("文件状态异常");
        } catch (IOException e) {
            throw new FileUploadIOException("文件 IO 异常");
        }

        Integer id = getIdFromSession(session);
        String url = "/upload/"+fileName;
        customerService.changeIcon(id,url);

        //将文件复制到upload文件夹中
        File upload = new File("src/main/resources/static/upload");
        Path oldPath = Paths.get(dir.getAbsoluteFile()+"/"+fileName);
        Path newPath = Paths.get(upload.getAbsolutePath()+"/"+fileName);
        try {
            Files.copy(oldPath,newPath);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return new JsonResult<>(OK,url);
    }

    @RequestMapping("updateBookCount")
    public JsonResult<Void> updateBookCount(HttpSession session,Integer bookCount,Double bookPrice){
        Integer id = getIdFromSession(session);
        customerService.updateBookCount(id,bookCount,new BigDecimal(bookPrice));
        return new JsonResult<>(OK);
    }

    @RequestMapping("update")
    public JsonResult<Void> updateCustomer(Integer id,Customer customer){
        customerService.updateCustomer(id,customer);
        return new JsonResult<>(OK);
    }

    @RequestMapping("delete")
    public JsonResult<Void> deleteCustomer(Integer id){
        customerService.deleteCustomer(id);
        return  new JsonResult<>(OK);
    }

}
