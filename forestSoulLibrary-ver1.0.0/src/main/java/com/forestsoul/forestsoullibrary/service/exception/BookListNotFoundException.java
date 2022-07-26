package com.forestsoul.forestsoullibrary.service.exception;

public class BookListNotFoundException extends ServiceException{
    public BookListNotFoundException() {
    }

    public BookListNotFoundException(String message) {
        super(message);
    }

    public BookListNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public BookListNotFoundException(Throwable cause) {
        super(cause);
    }

    public BookListNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
