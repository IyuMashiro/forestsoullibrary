package com.forestsoul.forestsoullibrary.service.exception;

public class IndentNotFountException extends ServiceException{
    public IndentNotFountException() {
    }

    public IndentNotFountException(String message) {
        super(message);
    }

    public IndentNotFountException(String message, Throwable cause) {
        super(message, cause);
    }

    public IndentNotFountException(Throwable cause) {
        super(cause);
    }

    public IndentNotFountException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
