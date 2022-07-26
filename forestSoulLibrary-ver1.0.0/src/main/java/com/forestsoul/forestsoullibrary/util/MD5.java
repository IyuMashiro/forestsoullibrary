package com.forestsoul.forestsoullibrary.util;

import org.springframework.core.annotation.Order;
import org.springframework.util.DigestUtils;

public class MD5 {

    public static String getMD5(String password,String salt){
        //md5 加密算法的调用
        for (int i = 0;i < 3;i++){
            password =DigestUtils.md5DigestAsHex((salt+password+salt).getBytes()).toUpperCase();
        }

        return password;
    }
}
