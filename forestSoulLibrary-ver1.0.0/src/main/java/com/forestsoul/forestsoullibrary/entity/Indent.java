package com.forestsoul.forestsoullibrary.entity;

import java.math.BigDecimal;
import java.util.Date;

public class Indent {
    private Integer indentId;
    private Integer customerId;
    private BigDecimal indentPrice;
    private String indentName;
    private String indentPhone;
    private String indentAddress;
    private Date indentDate;
    private Integer indentState;

    public Integer getIndentId() {
        return indentId;
    }

    public void setIndentId(Integer indentId) {
        this.indentId = indentId;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public BigDecimal getIndentPrice() {
        return indentPrice;
    }

    public void setIndentPrice(BigDecimal indentPrice) {
        this.indentPrice = indentPrice;
    }

    public String getIndentName() {
        return indentName;
    }

    public void setIndentName(String indentName) {
        this.indentName = indentName;
    }

    public String getIndentPhone() {
        return indentPhone;
    }

    public void setIndentPhone(String indentPhone) {
        this.indentPhone = indentPhone;
    }

    public String getIndentAddress() {
        return indentAddress;
    }

    public void setIndentAddress(String indentAddress) {
        this.indentAddress = indentAddress;
    }

    public Date getIndentDate() {
        return indentDate;
    }

    public void setIndentDate(Date indentDate) {
        this.indentDate = indentDate;
    }

    public Integer getIndentState() {
        return indentState;
    }

    public void setIndentState(Integer indentState) {
        this.indentState = indentState;
    }

    @Override
    public String toString() {
        return "Indent{" +
                "indentId=" + indentId +
                ", customerId=" + customerId +
                ", indentPrice=" + indentPrice +
                ", indentName='" + indentName + '\'' +
                ", indentPhone='" + indentPhone + '\'' +
                ", indentAddress='" + indentAddress + '\'' +
                ", indentDate=" + indentDate +
                ", indentState=" + indentState +
                '}';
    }
}
