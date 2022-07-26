package com.forestsoul.forestsoullibrary.controller;

import com.forestsoul.forestsoullibrary.entity.Book;
import com.forestsoul.forestsoullibrary.entity.Car;
import com.forestsoul.forestsoullibrary.service.BookService;
import com.forestsoul.forestsoullibrary.service.CarService;
import com.forestsoul.forestsoullibrary.util.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("car")
public class CarController extends BaseController{

    @Autowired
    private CarService carService;
    @Autowired
    private BookService bookService;

    @RequestMapping("info")
    public JsonResult<List<Book>> getCarInfo(HttpSession session){
        Integer id = getIdFromSession(session);
        List<Car> cars = carService.getCarById(id);
        List<Book> books = new ArrayList<>();
        for (int i = 0;i < cars.toArray().length;i++){
            books.add(bookService.findBookById(cars.get(i).getBookId()));
        }
        return new JsonResult<>(OK,books);
    }

    @RequestMapping("bookCount")
    public JsonResult<Integer> getBookCount(Integer bookId,HttpSession session){
        Integer bookCount = carService.getBookCount(getIdFromSession(session), bookId);
        return new JsonResult<>(OK,bookCount);
    }

    @RequestMapping("setCount")
    public JsonResult<Void> setBookCount(Integer bookCount,Integer bookId,HttpSession session){
        carService.setBookCount(bookCount,getIdFromSession(session),bookId);
        return new JsonResult<>(OK);
    }

    @RequestMapping("addCar")
    public JsonResult<Void> addCar(Integer bookCount,Integer bookId,HttpSession session){
        if (session.getAttribute("customerName") == null){
            return new JsonResult<>(5010);
        }
        Car car = new Car();
        car.setBookId(bookId);
        car.setCustomerId(getIdFromSession(session));
        car.setBookCount(bookCount);
        carService.addCar(car);
        return new  JsonResult<>(OK);
    }

    @RequestMapping("deleteOnce")
    public JsonResult<Void> deleteById(Integer bookId,HttpSession session){
        Integer customerId = getIdFromSession(session);
        carService.deleteById(customerId,bookId);
        return new JsonResult<>(OK);
    }

    @RequestMapping("deleteAll")
    public JsonResult<Void> deleteById(HttpSession session){
        Integer customerId = getIdFromSession(session);
        carService.deleteByAll(customerId);
        return new JsonResult<>(OK);
    }

}
