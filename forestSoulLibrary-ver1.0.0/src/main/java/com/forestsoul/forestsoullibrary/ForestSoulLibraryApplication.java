package com.forestsoul.forestsoullibrary;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.forestsoul.forestsoullibrary.mapper")
public class ForestSoulLibraryApplication {

    public static void main(String[] args) {
        SpringApplication.run(ForestSoulLibraryApplication.class, args);
    }

}
