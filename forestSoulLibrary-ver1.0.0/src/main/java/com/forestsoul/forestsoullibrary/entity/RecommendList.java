package com.forestsoul.forestsoullibrary.entity;

public class RecommendList {
    private Integer recommendId;
    private Integer bookId;

    public Integer getRecommendId() {
        return recommendId;
    }

    public void setRecommendId(Integer recommendId) {
        this.recommendId = recommendId;
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    @Override
    public String toString() {
        return "RecommendList{" +
                "recommendId=" + recommendId +
                ", bookId=" + bookId +
                '}';
    }
}
