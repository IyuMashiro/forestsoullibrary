package com.forestsoul.forestsoullibrary.config;

import com.forestsoul.forestsoullibrary.interceptor.LoginInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.List;

//处理器拦截器的注册
@Configuration
public class LoginInterceptorConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        //创建自定义拦截器对象
        HandlerInterceptor interceptor = new LoginInterceptor();
        //配置白名单
        List<String> patterns = new ArrayList<>();
        patterns.add("/index.html");
        patterns.add("/customer/reg");
        patterns.add("/customer/login");
        patterns.add("/customer/selectByLogin");
        patterns.add("/customerWeb/book-info.html");
        patterns.add("/customerWeb/book-search.html");
        //完成拦截器的注册
        registry.addInterceptor(interceptor).addPathPatterns("/customerWeb/**").excludePathPatterns(patterns);

    }
}
