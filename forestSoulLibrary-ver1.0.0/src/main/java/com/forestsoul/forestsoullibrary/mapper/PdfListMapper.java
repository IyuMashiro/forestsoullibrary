package com.forestsoul.forestsoullibrary.mapper;

import com.forestsoul.forestsoullibrary.entity.PdfList;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PdfListMapper {

    /**
     * 根据用户 id 和 书籍 id 查询 pdf 是否已拥有
     * @param customerId 用户 id
     * @param bookId  书籍 id
     * @return pdf 数据
     * */
    PdfList findPdfById(Integer bookId, Integer customerId);

    /**
     * 根据用户 id 和 书籍 id 添加数据
     * @param customerId 用户 id
     * @param bookId  书籍 id
     * @return 受影响的行数
     * */
    Integer addPdfList(Integer bookId, Integer customerId);

    /**
     * 根据用户 id 和查询所有 pdf
     * @param customerId 用户 id
     * @return pdf 数据
     * */
    List<PdfList> getAllPdfById(Integer customerId);

}
