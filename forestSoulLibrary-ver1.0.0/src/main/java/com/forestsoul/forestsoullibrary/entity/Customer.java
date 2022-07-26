package com.forestsoul.forestsoullibrary.entity;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Objects;

public class Customer {
    private Integer customerId;
    private String customerLogin;
    private String customerName;
    private String customerPassword;

    private String customerEmail;

    private String customerSalt;
    private String customerIcon;
    private Date customerDate;
    private Integer customerBookCount;
    private BigDecimal customerPriceCount;
    private Integer customerDelete;

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public String getCustomerLogin() {
        return customerLogin;
    }

    public void setCustomerLogin(String customerLogin) {
        this.customerLogin = customerLogin;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerPassword() {
        return customerPassword;
    }

    public void setCustomerPassword(String customerPassword) {
        this.customerPassword = customerPassword;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getCustomerSalt() {
        return customerSalt;
    }

    public void setCustomerSalt(String customerSalt) {
        this.customerSalt = customerSalt;
    }

    public String getCustomerIcon() {
        return customerIcon;
    }

    public void setCustomerIcon(String customerIcon) {
        this.customerIcon = customerIcon;
    }

    public Date getCustomerDate() {
        return customerDate;
    }

    public void setCustomerDate(Date customerDate) {
        this.customerDate = customerDate;
    }

    public Integer getCustomerBookCount() {
        return customerBookCount;
    }

    public void setCustomerBookCount(Integer customerBookCount) {
        this.customerBookCount = customerBookCount;
    }

    public BigDecimal getCustomerPriceCount() {
        return customerPriceCount;
    }

    public void setCustomerPriceCount(BigDecimal customerPriceCount) {
        this.customerPriceCount = customerPriceCount;
    }

    public Integer getCustomerDelete() {
        return customerDelete;
    }

    public void setCustomerDelete(Integer customerDelete) {
        this.customerDelete = customerDelete;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "customerId=" + customerId +
                ", customerLogin='" + customerLogin + '\'' +
                ", customerName='" + customerName + '\'' +
                ", customerPassword='" + customerPassword + '\'' +
                ", customerEmail='" + customerEmail + '\'' +
                ", customerSalt='" + customerSalt + '\'' +
                ", customerIcon='" + customerIcon + '\'' +
                ", customerDate=" + customerDate +
                ", customerBookCount=" + customerBookCount +
                ", customerPriceCount=" + customerPriceCount +
                ", customerDelete=" + customerDelete +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Customer customer = (Customer) o;
        return Objects.equals(customerId, customer.customerId) && Objects.equals(customerLogin, customer.customerLogin) && Objects.equals(customerName, customer.customerName) && Objects.equals(customerPassword, customer.customerPassword) && Objects.equals(customerEmail, customer.customerEmail) && Objects.equals(customerSalt, customer.customerSalt) && Objects.equals(customerIcon, customer.customerIcon) && Objects.equals(customerDate, customer.customerDate) && Objects.equals(customerBookCount, customer.customerBookCount) && Objects.equals(customerPriceCount, customer.customerPriceCount) && Objects.equals(customerDelete, customer.customerDelete);
    }

    @Override
    public int hashCode() {
        return Objects.hash(customerId, customerLogin, customerName, customerPassword, customerEmail, customerSalt, customerIcon, customerDate, customerBookCount, customerPriceCount, customerDelete);
    }
}
