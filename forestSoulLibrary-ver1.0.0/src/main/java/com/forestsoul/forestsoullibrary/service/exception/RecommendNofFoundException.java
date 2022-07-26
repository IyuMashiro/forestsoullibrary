package com.forestsoul.forestsoullibrary.service.exception;

public class RecommendNofFoundException extends ServiceException{
    public RecommendNofFoundException() {
        super();
    }

    public RecommendNofFoundException(String message) {
        super(message);
    }

    public RecommendNofFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public RecommendNofFoundException(Throwable cause) {
        super(cause);
    }

    protected RecommendNofFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
