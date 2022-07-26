package com.forestsoul.forestsoullibrary.entity;

import java.util.Date;
import java.util.Objects;

public class Admin {
    private Integer id;
    private String loginAcct;
    private String name;
    private String password;

    private String salt;
    private Date create_date;
    private Integer state;
    private Integer delete;
    private Integer leven;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLoginAcct() {
        return loginAcct;
    }

    public void setLoginAcct(String loginAcct) {
        this.loginAcct = loginAcct;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public Date getCreate_date() {
        return create_date;
    }

    public void setCreate_date(Date create_date) {
        this.create_date = create_date;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public Integer getDelete() {
        return delete;
    }

    public void setDelete(Integer delete) {
        this.delete = delete;
    }

    public Integer getLeven() {
        return leven;
    }

    public void setLeven(Integer leven) {
        this.leven = leven;
    }

    @Override
    public String toString() {
        return "AdminMapper.xml{" +
                "id=" + id +
                ", loginAcct='" + loginAcct + '\'' +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                ", salt='" + salt + '\'' +
                ", create_date=" + create_date +
                ", state=" + state +
                ", delete=" + delete +
                ", leven=" + leven +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Admin admin = (Admin) o;
        return Objects.equals(id, admin.id) && Objects.equals(loginAcct, admin.loginAcct) && Objects.equals(name, admin.name) && Objects.equals(password, admin.password) && Objects.equals(salt, admin.salt) && Objects.equals(create_date, admin.create_date) && Objects.equals(state, admin.state) && Objects.equals(delete, admin.delete) && Objects.equals(leven, admin.leven);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, loginAcct, name, password, salt, create_date, state, delete, leven);
    }
}
