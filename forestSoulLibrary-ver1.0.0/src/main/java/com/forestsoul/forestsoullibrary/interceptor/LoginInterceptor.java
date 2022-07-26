package com.forestsoul.forestsoullibrary.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LoginInterceptor implements HandlerInterceptor {

    /**
     * 检查全局 session 对象中是否有 id 数据，如果有则放行，没有则重定向至登录页面
     * @param  request 请求对象
     * @param response 响应对象
     * @param handler  处理器(url + controller: 映射)
     * @return  如果放回为 true 表示放行，为 false 表示拦截
     * @throws Exception
     *
     * */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Object customerId = request.getSession().getAttribute("customerId");
        if (customerId == null){
            response.sendRedirect("/web/login.html");
            return false;
        }

        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }
}
