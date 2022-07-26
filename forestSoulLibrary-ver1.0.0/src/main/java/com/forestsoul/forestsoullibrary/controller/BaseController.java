package com.forestsoul.forestsoullibrary.controller;

import com.forestsoul.forestsoullibrary.service.exception.*;
import com.forestsoul.forestsoullibrary.util.JsonResult;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpSession;

public class BaseController {

    //操作成功的状态码
    public static final int OK = 200;

    //统一处理抛出的异常
    @ExceptionHandler({ServiceException.class,FileUploadException.class})
    public JsonResult<Void> handleException(Throwable e){
        JsonResult<Void> result = new JsonResult<>(e);
        if (e instanceof CustomerNameDuplicatedException){
            result.setState(4000);
            result.setMessage("用户名已被使用");
        }else if (e instanceof InsertException){
            result.setState(4001);
            result.setMessage("注册时产生未知的异常");
        } else if (e instanceof CustomerNotFoundException) {
            result.setState(5000);
            result.setMessage("用户不存在");
        } else if (e instanceof PasswordNotMatchException) {
            result.setState(5001);
            result.setMessage("密码错误");
        }else if (e instanceof UpdateException){
            result.setState(5002);
            result.setMessage("更新数据时产生未知异常");
        }else if (e instanceof AddressCountLimitException){
            result.setState(5003);
            result.setMessage("用户的收货地址超出上限");
        } else if (e instanceof  AccessDeniedException) {
            result.setState(5004);
            result.setMessage("非法的数据访问");
        } else if (e instanceof AddressNotFoundException) {
            result.setState(5005);
            result.setMessage("用户的收货地址未找到");
        } else if (e instanceof DeleteException) {
            result.setState(5006);
            result.setMessage("删除收货地址时出现未知异常");
        } else if (e instanceof AdminNotFoundException) {
            result.setState(5007);
            result.setMessage("管理员账户不存在");
        } else if (e instanceof RecommendNofFoundException) {
            result.setState(5008);
            result.setMessage("推荐数据未找到");
        } else if (e instanceof BookNotFoundException) {
            result.setState(5009);
            result.setMessage("数据数据未找到");
        }else if (e instanceof NoLoginException){
            result.setState(5010);
            result.setMessage("用户未登录");
        } else if (e instanceof CarNotFoundException) {
            result.setState(5011);
            result.setMessage("购物车数据未找到");
        } else if (e instanceof  PdfNotFoundException) {
            result.setState(5012);
            result.setMessage("pdf 数据未找到");
        } else if (e instanceof FileEmptyException) {
            result.setState(6000);
            result.setMessage("文件上传为空");
        } else if (e instanceof FileTypeException) {
            result.setState(6001);
            result.setMessage("文件类型异常");
        } else if (e instanceof FileSizeException) {
            result.setState(6002);
            result.setMessage("文件大小异常");
        } else if (e instanceof FileStateException) {
            result.setState(6003);
            result.setMessage("文件状态异常");
        } else if (e instanceof FileUploadIOException) {
            result.setState(6004);
            result.setMessage("文件上传 IO 异常");
        }

        return result;
    }

    /**
     * 获取 session 对象的 id
     * @param session session 对象
     * @return 当前登录用户的 id
     * */
    protected final  Integer getIdFromSession(HttpSession session){
        return Integer.valueOf(session.getAttribute("customerId").toString());
    }

    /**
     * 获取 session 对象的 id
     * @param session session 对象
     * @return 当前登录的管理员 id
     * */
    protected final  Integer getAdminIdFromSession(HttpSession session){
        return Integer.valueOf(session.getAttribute("AdminId").toString());
    }

    /**
     * 获取当前用户的昵称
     * @param session session 对象
     * @return 当前登录用户的昵称
     *
     * */
    protected  final  String  getCustomerNameFromSession(HttpSession session){
        return session.getAttribute("customerName").toString();
    }
}
