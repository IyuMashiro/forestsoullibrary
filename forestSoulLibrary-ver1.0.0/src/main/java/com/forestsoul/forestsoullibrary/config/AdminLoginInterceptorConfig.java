package com.forestsoul.forestsoullibrary.config;

import com.forestsoul.forestsoullibrary.interceptor.AdminLoginInterceptor;
import com.forestsoul.forestsoullibrary.interceptor.LoginInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class AdminLoginInterceptorConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        //创建自定义拦截器对象
        HandlerInterceptor interceptor = new AdminLoginInterceptor();
        //配置白名单
        List<String> patterns = new ArrayList<>();
        patterns.add("/web/login.html");
        patterns.add("/web/admin-login.html");
        patterns.add("/web/register.html");
        patterns.add("/admin/delete");
        //完成拦截器的注册
        registry.addInterceptor(interceptor).addPathPatterns("/web/**").excludePathPatterns(patterns);

    }
}
