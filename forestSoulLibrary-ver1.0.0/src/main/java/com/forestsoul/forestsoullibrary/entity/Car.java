package com.forestsoul.forestsoullibrary.entity;

import java.math.BigDecimal;

public class Car {
    private Integer carId;
    private Integer customerId;
    private Integer bookId;
    private Integer bookCount;

    public Integer getCarId() {
        return carId;
    }

    public void setCarId(Integer carId) {
        this.carId = carId;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public Integer getBookCount() {
        return bookCount;
    }

    public void setBookCount(Integer bookCount) {
        this.bookCount = bookCount;
    }

    @Override
    public String toString() {
        return "Car{" +
                "carId=" + carId +
                ", customerId=" + customerId +
                ", bookId=" + bookId +
                ", bookCount=" + bookCount +
                '}';
    }
}
