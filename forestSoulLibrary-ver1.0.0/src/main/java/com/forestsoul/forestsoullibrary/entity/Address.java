package com.forestsoul.forestsoullibrary.entity;

public class Address {
    private Integer addressId;
    private Integer customerId;
    private String addressName;
    private String  provinceName;
    private Integer provinceCode;
    private String cityName;
    private Integer cityCode;
    private String areaName;
    private Integer areaCode;
    private String addressPosition;
    private String addressPhone;
    private Integer addressDefault;

    public Address() {
    }

    public Integer getAddressId() {
        return addressId;
    }

    public void setAddressId(Integer addressId) {
        this.addressId = addressId;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public String getAddressName() {
        return addressName;
    }

    public void setAddressName(String addressName) {
        this.addressName = addressName;
    }

    public String getProvinceName() {
        return provinceName;
    }

    public void setProvinceName(String provinceName) {
        this.provinceName = provinceName;
    }

    public Integer getProvinceCode() {
        return provinceCode;
    }

    public void setProvinceCode(Integer provinceCode) {
        this.provinceCode = provinceCode;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public Integer getCityCode() {
        return cityCode;
    }

    public void setCityCode(Integer cityCode) {
        this.cityCode = cityCode;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    public Integer getAreaCode() {
        return areaCode;
    }

    public void setAreaCode(Integer areaCode) {
        this.areaCode = areaCode;
    }

    public String getAddressPosition() {
        return addressPosition;
    }

    public void setAddressPosition(String addressPosition) {
        this.addressPosition = addressPosition;
    }

    public String getAddressPhone() {
        return addressPhone;
    }

    public void setAddressPhone(String addressPhone) {
        this.addressPhone = addressPhone;
    }

    public Integer getAddressDefault() {
        return addressDefault;
    }

    public void setAddressDefault(Integer addressDefault) {
        this.addressDefault = addressDefault;
    }

    @Override
    public String toString() {
        return "Address{" +
                "addressId=" + addressId +
                ", customerId=" + customerId +
                ", addressName='" + addressName + '\'' +
                ", provinceName='" + provinceName + '\'' +
                ", provinceCode=" + provinceCode +
                ", cityName='" + cityName + '\'' +
                ", cityCode=" + cityCode +
                ", areaName='" + areaName + '\'' +
                ", areaCode=" + areaCode +
                ", addressPosition='" + addressPosition + '\'' +
                ", addressPhone='" + addressPhone + '\'' +
                ", addressDefault=" + addressDefault +
                '}';
    }
}
