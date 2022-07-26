package com.forestsoul.forestsoullibrary.service.exception;

public class PdfNotFoundException extends ServiceException{
    public PdfNotFoundException() {
    }

    public PdfNotFoundException(String message) {
        super(message);
    }

    public PdfNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public PdfNotFoundException(Throwable cause) {
        super(cause);
    }

    public PdfNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
