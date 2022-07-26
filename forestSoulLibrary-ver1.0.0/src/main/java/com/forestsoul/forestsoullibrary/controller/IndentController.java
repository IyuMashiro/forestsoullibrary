package com.forestsoul.forestsoullibrary.controller;

import com.forestsoul.forestsoullibrary.entity.Indent;
import com.forestsoul.forestsoullibrary.entity.PdfList;
import com.forestsoul.forestsoullibrary.service.IndentService;
import com.forestsoul.forestsoullibrary.util.JsonResult;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("indent")
public class IndentController extends BaseController{
    @Autowired
    private IndentService indentService;

    @RequestMapping("addIndent")
    public JsonResult<Integer> addIndent(HttpSession session, Integer addressId){
        Integer indentId = indentService.addIndent(getIdFromSession(session), addressId);
        return new JsonResult<>(OK,indentId);
    }

    @RequestMapping("updateState")
    public JsonResult<Void> updateState(Integer indentId,Integer state){
        indentService.updateState(indentId,state);
        return new JsonResult<>(OK);
    }
    @RequestMapping("getInfo")
    public JsonResult<PageInfo<Indent>> getPage(HttpSession session,
                                            @RequestParam(value = "pageNum",defaultValue = "1") Integer pageNum,
                                            @RequestParam(value = "pageSize",defaultValue = "5") Integer pageSize){
        PageInfo<Indent> pageInfo = indentService.getPageInfo(getIdFromSession(session),pageNum,pageSize);
        return new JsonResult<>(OK,pageInfo);
    }

    @RequestMapping("getInfoAll")
    public JsonResult<PageInfo<Indent>> getPage(
                                                @RequestParam(value = "pageNum",defaultValue = "1") Integer pageNum,
                                                @RequestParam(value = "pageSize",defaultValue = "5") Integer pageSize){
        PageInfo<Indent> pageInfo = indentService.getPageInfo(pageNum,pageSize);
        return new JsonResult<>(OK,pageInfo);
    }

    @RequestMapping("getOnce")
    public JsonResult<Indent> getOnce(Integer indentId){
        Indent data = indentService.getOnce(indentId);
        return new JsonResult<>(OK,data);
    }

    @RequestMapping("delete")
    public JsonResult<Void> delete(Integer indentId){
        indentService.deleteIndent(indentId);
        return new JsonResult<>(OK);
    }

    @RequestMapping("update")
    public JsonResult<Void> updateIndent(Integer indentId,Indent indent){
        indent.setIndentId(indentId);
        indentService.updateIndent(indent);
        return new JsonResult<>(OK);
    }
}
