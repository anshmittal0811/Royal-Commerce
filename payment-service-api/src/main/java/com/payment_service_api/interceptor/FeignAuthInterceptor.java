package com.payment_service_api.interceptor;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component
public class FeignAuthInterceptor implements RequestInterceptor {

    @Override
    public void apply(RequestTemplate template) {

        ServletRequestAttributes attrs =
                (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if (attrs == null)
            return;

        var request = attrs.getRequest();

        // Forward user identity headers
        String userId = request.getHeader("X-USER-ID");
        String email = request.getHeader("X-USER-EMAIL");
        String role = request.getHeader("X-USER-ROLE");

        if (userId != null)
            template.header("X-USER-ID", userId);
        if (email != null)
            template.header("X-USER-EMAIL", email);
        if (role != null)
            template.header("X-USER-ROLE", role);
    }
}

