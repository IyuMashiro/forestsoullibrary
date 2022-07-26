package com.forestsoul.forestsoullibrary.entity;

import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;

public class Book {
   private Integer bookId;
   private String bookName;
   private BigDecimal bookPrice;
   private String bookAuthor;
   private Integer bookSales;
   private Integer bookInventory;
   private String bookType;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
   private Date bookDate;
   private String bookImg;

   private String bookPdf;
   private Integer bookDelete;

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public BigDecimal getBookPrice() {
        return bookPrice;
    }

    public void setBookPrice(BigDecimal bookPrice) {
        this.bookPrice = bookPrice;
    }

    public String getBookAuthor() {
        return bookAuthor;
    }

    public void setBookAuthor(String bookAuthor) {
        this.bookAuthor = bookAuthor;
    }

    public Integer getBookSales() {
        return bookSales;
    }

    public void setBookSales(Integer bookSales) {
        this.bookSales = bookSales;
    }

    public Integer getBookInventory() {
        return bookInventory;
    }

    public void setBookInventory(Integer bookInventory) {
        this.bookInventory = bookInventory;
    }

    public String getBookType() {
        return bookType;
    }

    public void setBookType(String bookType) {
        this.bookType = bookType;
    }

    public Date getBookDate() {
        return bookDate;
    }

    public void setBookDate(Date bookDate) {
        this.bookDate = bookDate;
    }

    public String getBookImg() {
        return bookImg;
    }

    public void setBookImg(String bookImg) {
        this.bookImg = bookImg;
    }

    public Integer getBookDelete() {
        return bookDelete;
    }

    public void setBookDelete(Integer bookDelete) {
        this.bookDelete = bookDelete;
    }

    public String getBookPdf() {
        return bookPdf;
    }

    public void setBookPdf(String bookPdf) {
        this.bookPdf = bookPdf;
    }

    @Override
    public String toString() {
        return "Book{" +
                "bookId=" + bookId +
                ", bookName='" + bookName + '\'' +
                ", bookPrice=" + bookPrice +
                ", bookAuthor='" + bookAuthor + '\'' +
                ", bookSales=" + bookSales +
                ", bookInventory=" + bookInventory +
                ", bookType='" + bookType + '\'' +
                ", bookDate=" + bookDate +
                ", bookImg='" + bookImg + '\'' +
                ", bookPdf='" + bookPdf + '\'' +
                ", bookDelete=" + bookDelete +
                '}';
    }
}
