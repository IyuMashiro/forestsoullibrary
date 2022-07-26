package com.forestsoul.forestsoullibrary.service.Impl;

import com.forestsoul.forestsoullibrary.entity.*;
import com.forestsoul.forestsoullibrary.mapper.IndentMapper;
import com.forestsoul.forestsoullibrary.service.*;
import com.forestsoul.forestsoullibrary.service.exception.IndentNotFountException;
import com.forestsoul.forestsoullibrary.service.exception.InsertException;
import com.forestsoul.forestsoullibrary.service.exception.PdfNotFoundException;
import com.forestsoul.forestsoullibrary.service.exception.UpdateException;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class IndentServiceImpl implements IndentService {

    @Autowired
    private IndentMapper indentMapper;
    @Autowired
    private AddressService addressService;
    @Autowired
    private BookService bookService;
    @Autowired
    private BookListService bookListService;
    @Autowired
    private CarService carService;

    @Override
    public Integer addIndent(Integer customerId, Integer addressId) {
        Indent indent = new Indent();
        indent.setCustomerId(customerId);
        List<Car> cars = carService.getCarById(customerId);
        BigDecimal totalPrice = new BigDecimal("0.00");
        for (Car car:cars){
            Integer bookId = car.getBookId();
            Integer bookCount = car.getBookCount();
            BigDecimal bookPrice = bookService.findBookById(bookId).getBookPrice();
            totalPrice = totalPrice.add(bookPrice.multiply(BigDecimal.valueOf(bookCount)));


        }

        Address address = addressService.findByAId(addressId);
        String name = address.getAddressName();
        String phone = address.getAddressPhone();
        String position = address.getProvinceName()+address.getCityName()+address.getAreaName()+address.getAddressPosition();
        indent.setIndentPrice(totalPrice);
        indent.setIndentName(name);
        indent.setIndentPhone(phone);
        indent.setIndentAddress(position);
        indent.setIndentDate(new Date());
        indent.setIndentState(0);

        indent .setIndentId((int) new Date().getTime()+customerId);
        Integer rows = indentMapper.addIndent(indent);


        if (rows != 1){
            throw new InsertException("新增订单出现未知错误");
        }

        for (Car car:cars){
            BookList bookList = new BookList();
            bookList.setIndentId(indent.getIndentId());
            bookList.setBookId(car.getBookId());
            bookList.setBookCount(car.getBookCount());
            bookListService.addBookList(bookList);
        }


        carService.deleteByAll(customerId);
        return indent.getIndentId();
    }

    @Override
    public void updateState(Integer indentId, Integer state) {
        Integer rows = indentMapper.updateState(indentId, state);
        if (rows != 1){
            throw new UpdateException("更新订单状态时出现未知异常");
        }
    }

    @Override
    public PageInfo<Indent> getPageInfo(Integer customerId, Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        List<Indent> indents = indentMapper.findById(customerId);
        if (indents == null){
            throw new IndentNotFountException("获取数据时出现未知异常");
        }

        return new  PageInfo<>(indents);
    }

    @Override
    public PageInfo<Indent> getPageInfo(Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        List<Indent> indents = indentMapper.findAll();
        if (indents == null){
            throw new IndentNotFountException("获取数据时出现未知异常");
        }

        return new  PageInfo<>(indents);
    }

    @Override
    public void updateIndent(Indent indent) {
        Integer rows = indentMapper.updateIndent(indent);
        if (rows != 1){
            throw new UpdateException("更新数据时发生未知异常");
        }
    }

    @Override
    public void deleteIndent(Integer indentId) {
        Integer rows = indentMapper.deleteIndent(indentId);
        if (rows != 1){
            throw new UpdateException("更新数据时发生未知异常");
        }
    }

    @Override
    public Indent getOnce(Integer indentId) {
        Indent once = indentMapper.getOnce(indentId);
        if (once == null){
            throw new IndentNotFountException("订单数据未找到");
        }
        return once;
    }

}
