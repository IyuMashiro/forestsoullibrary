package com.forestsoul.forestsoullibrary.entity;

public class PdfList {
    private Integer pdfId;
    private Integer bookId;
    private Integer customerId;

    public Integer getPdfId() {
        return pdfId;
    }

    public void setPdfId(Integer pdfId) {
        this.pdfId = pdfId;
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    @Override
    public String toString() {
        return "PdfList{" +
                "pdfId=" + pdfId +
                ", bookId=" + bookId +
                ", customerId=" + customerId +
                '}';
    }
}
