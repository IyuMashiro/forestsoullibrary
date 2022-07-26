package com.forestsoul.forestsoullibrary.config;

import com.forestsoul.forestsoullibrary.interceptor.LoginInterceptor;
import com.forestsoul.forestsoullibrary.interceptor.templatesInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class templatesInterceptorConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        HandlerInterceptor interceptor = new templatesInterceptor();

        registry.addInterceptor(interceptor).addPathPatterns("/templates/**");
    }


}
