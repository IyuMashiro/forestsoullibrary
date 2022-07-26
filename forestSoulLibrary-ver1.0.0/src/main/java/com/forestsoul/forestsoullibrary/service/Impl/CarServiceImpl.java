package com.forestsoul.forestsoullibrary.service.Impl;

import com.forestsoul.forestsoullibrary.entity.Car;
import com.forestsoul.forestsoullibrary.entity.Customer;
import com.forestsoul.forestsoullibrary.mapper.CarMapper;
import com.forestsoul.forestsoullibrary.mapper.CustomerMapper;
import com.forestsoul.forestsoullibrary.service.BookService;
import com.forestsoul.forestsoullibrary.service.CarService;
import com.forestsoul.forestsoullibrary.service.CustomerService;
import com.forestsoul.forestsoullibrary.service.exception.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarServiceImpl implements CarService {

    @Autowired
    private CarMapper carMapper;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private BookService bookService;

    @Override
    public List<Car> getCarById(Integer customerId) {
        List<Car> cars = carMapper.findCarByCustomerId(customerId);
        if (cars == null){
            throw new CarNotFoundException("购物车数据不存在");
        }
        return cars;
    }

    @Override
    public void addCar(Car car) {
        Integer customerId = customerService.getById(car.getCustomerId()).getCustomerId();
        Integer bookId = bookService.findBookById(car.getBookId()).getBookId();
        Integer bookCount = carMapper.getBookCount(customerId, bookId);
        if (bookCount != null){
            setBookCount(bookCount+1,customerId,bookId);
        }else {
            Integer rows = carMapper.addCar(customerId, bookId, car.getBookCount());
            if (rows != 1){
                throw new InsertException("添加数据时发生未知异常");
            }
        }
    }

    @Override
    public Integer getBookCount(Integer customerId, Integer bookId) {
        return carMapper.getBookCount(customerId, bookId);
    }

    @Override
    public void setBookCount(Integer bookCount, Integer customerId, Integer bookId) {
        Integer rows = carMapper.setBookCount(customerId, bookId, bookCount);
        if (rows != 1){
            throw new UpdateException("更新数据时发生未知异常");
        }
    }

    @Override
    public void deleteById(Integer customerId, Integer bookId) {
        Integer rows = carMapper.deleteById(customerId, bookId);
        if (rows != 1){
            throw new DeleteException("删除数据时发生未知异常");
        }

    }

    @Override
    public void deleteByAll(Integer customerId) {
        Integer rows = carMapper.deleteAll(customerId);
        if (rows < 1){
            throw new DeleteException("删除数据时发生未知异常");
        }
    }
}
