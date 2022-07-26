package com.forestsoul.forestsoullibrary.service.Impl;

import com.forestsoul.forestsoullibrary.entity.Book;
import com.forestsoul.forestsoullibrary.entity.PdfList;
import com.forestsoul.forestsoullibrary.mapper.PdfListMapper;
import com.forestsoul.forestsoullibrary.service.BookService;
import com.forestsoul.forestsoullibrary.service.PdfListService;
import com.forestsoul.forestsoullibrary.service.exception.InsertException;
import com.forestsoul.forestsoullibrary.service.exception.PdfNotFoundException;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PdfListServiceImpl implements PdfListService {

    @Autowired
    private PdfListMapper pdfListMapper;
    @Autowired
    private BookService bookService;

    @Override
    public String findPfdById(Integer bookId, Integer customerId) {
        PdfList pdf = pdfListMapper.findPdfById(bookId, customerId);
        if (pdf == null){
            throw new PdfNotFoundException("pdf 数据不存在");
        }
        String url = bookService.findBookById(bookId).getBookPdf();
        return url;
    }

    @Override
    public void addPdfList(Integer bookId, Integer customerId) {
        Integer rows = pdfListMapper.addPdfList(bookId, customerId);
        if (rows != 1){
            throw new InsertException("新增数据时发生未知异常");
        }
    }

    @Override
    public Book getBook(Integer bookId) {
        return bookService.findBookById(bookId);
    }

    @Override
    public PageInfo<PdfList> getPdfPage(Integer customerId, Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        List<PdfList> pdfList = pdfListMapper.getAllPdfById(customerId);
        if (pdfList == null){
            throw new PdfNotFoundException("获取数据时出现未知异常");
        }

        return new  PageInfo<>(pdfList);
    }
}
