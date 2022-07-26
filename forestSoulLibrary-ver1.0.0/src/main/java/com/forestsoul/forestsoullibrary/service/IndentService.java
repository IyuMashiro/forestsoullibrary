package com.forestsoul.forestsoullibrary.service;

import com.forestsoul.forestsoullibrary.entity.Book;
import com.forestsoul.forestsoullibrary.entity.Indent;
import com.github.pagehelper.PageInfo;

public interface IndentService {

    /**
     * 新增订单
     * @param customerId  用户 id
     * @param addressId 地址 id
     * @return 订单 id
     * */
    Integer addIndent(Integer customerId,Integer addressId);

    /**
     * 更新订单状态
     * @param indentId 订单id
     * @param state 订单状态
     * */
    void updateState(Integer indentId,Integer state);

    /**
     * 获取分页
     * @param pageNum 页号
     * @param pageSize 总页数
     * @return PageInfo 对象
     * */
    PageInfo<Indent> getPageInfo(Integer customerId ,Integer pageNum, Integer pageSize);

    /**
     * 获取分页
     * @param pageNum 页号
     * @param pageSize 总页数
     * @return PageInfo 对象
     * */
    PageInfo<Indent> getPageInfo(Integer pageNum, Integer pageSize);

    /**
     * 更新订单信息
     * @param indent 订单数据
     * */
    void updateIndent(Indent indent);
    /**
     * 删除订单信息
     * @param indentId 订单 id
     * */
    void deleteIndent(Integer indentId);

    /**
     * 根据订单 id 查询订单信息
     * @param indentId 订单 id
     * @return 订单信息
     * */
    Indent getOnce(Integer indentId);
}
