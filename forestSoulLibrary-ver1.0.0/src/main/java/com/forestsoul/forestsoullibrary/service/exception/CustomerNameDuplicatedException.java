package com.forestsoul.forestsoullibrary.service.exception;

public class CustomerNameDuplicatedException extends ServiceException{
    public CustomerNameDuplicatedException() {
        super();
    }

    public CustomerNameDuplicatedException(String message) {
        super(message);
    }

    public CustomerNameDuplicatedException(String message, Throwable cause) {
        super(message, cause);
    }

    public CustomerNameDuplicatedException(Throwable cause) {
        super(cause);
    }

    protected CustomerNameDuplicatedException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
