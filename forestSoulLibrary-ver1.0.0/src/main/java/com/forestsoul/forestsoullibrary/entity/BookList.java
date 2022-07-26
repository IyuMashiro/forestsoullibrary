package com.forestsoul.forestsoullibrary.entity;

public class BookList {
    private Integer bookListId;
    private Integer indentId;
    private Integer bookId;
    private Integer bookCount;

    public Integer getBookListId() {
        return bookListId;
    }

    public void setBookListId(Integer bookListId) {
        this.bookListId = bookListId;
    }

    public Integer getIndentId() {
        return indentId;
    }

    public void setIndentId(Integer indentId) {
        this.indentId = indentId;
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
        return "BookList{" +
                "bookListId=" + bookListId +
                ", indentId=" + indentId +
                ", bookId=" + bookId +
                ", bookCount=" + bookCount +
                '}';
    }
}
