package com.forestsoul.forestsoullibrary.service;

import com.forestsoul.forestsoullibrary.entity.Book;
import com.forestsoul.forestsoullibrary.entity.PdfList;
import com.github.pagehelper.PageInfo;

public interface PdfListService {

    /**
     * 根据用户 id 和 书籍 id 查询 pdf 是否已拥有
     * @param customerId 用户 id
     * @param bookId  书籍 id
     * @return pdf 数据
     * */
    String findPfdById(Integer bookId, Integer customerId);

    /**
     * 根据用户 id 和 书籍 id 添加数据
     * @param customerId 用户 id
     * @param bookId  书籍 id
     * */
    void addPdfList(Integer bookId, Integer customerId);

    /**
     * 根据书籍 id 获取书籍信息
     * @param bookId 书籍 id
     * @return 书籍信息
     * */
    Book getBook(Integer bookId);

    PageInfo<PdfList> getPdfPage(Integer customerId,Integer pageNum, Integer pageSize);
}
