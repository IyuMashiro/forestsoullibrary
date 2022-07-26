package com.forestsoul.forestsoullibrary.mapper;

import com.forestsoul.forestsoullibrary.entity.Indent;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IndentMapper {

    /**
     * 新增订单
     * @param indent  订单数据
     * @return 受影响的行数
     * */
    Integer addIndent(Indent indent);

    /**
     * 获取订单数据
     * @param customerId 用户 id
     * @return 订单数据
     * */
    List<Indent> findById(Integer customerId);

    /**
     * 获取全部订单数据
     * @return 订单数据
     * */
    List<Indent> findAll();

    /**
     * 更新订单状态
     * @param indentState 订单状态
     * @param indentId 订单 id
     * @return 受影响的行数
     * */
    Integer updateState(Integer indentId,Integer indentState);

    /**
     * 根据订单 id 查询订单信息
     * @param indentId 订单 id
     * @return 订单信息
     * */
    Indent getOnce(Integer indentId);

    /**
     * 更新订单信息
     * @param indent 订单数据
     * @return 受影响的行数
     * */
    Integer updateIndent(Indent indent);

    /**
     * 删除订单信息
     * @param indentId 订单 id
     * @return 受影响的行数
     * */
    Integer deleteIndent(Integer indentId);




}
