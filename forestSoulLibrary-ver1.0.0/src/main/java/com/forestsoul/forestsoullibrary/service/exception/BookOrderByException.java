package com.forestsoul.forestsoullibrary.service.exception;

public class BookOrderByException extends ServiceException{
    public BookOrderByException() {
    }

    public BookOrderByException(String message) {
        super(message);
    }

    public BookOrderByException(String message, Throwable cause) {
        super(message, cause);
    }

    public BookOrderByException(Throwable cause) {
        super(cause);
    }

    public BookOrderByException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
