package com.forestsoul.forestsoullibrary.entity;

public class City {
    private Integer id;
    private Integer code;
    private String name;
    private Integer parentId;
    private String levelId;

    public City() {
    }

    public City(Integer id, Integer code, String name, Integer parentId, String levelId) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.parentId = parentId;
        this.levelId = levelId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public String getLevelId() {
        return levelId;
    }

    public void setLevelId(String levelId) {
        this.levelId = levelId;
    }

    @Override
    public String toString() {
        return "City{" +
                "id=" + id +
                ", code=" + code +
                ", name='" + name + '\'' +
                ", parentId=" + parentId +
                ", levelId=" + levelId +
                '}';
    }
}

