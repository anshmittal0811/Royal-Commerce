package com.order_service_api.interceptor;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 * Feign request interceptor for forwarding authentication headers.
 * 
 * <p>This interceptor automatically forwards user identity headers from the
 * incoming request to outgoing Feign client requests. This enables authentication
 * propagation across microservices.
 * 
 * <p>Headers forwarded:
 * <ul>
 *   <li>X-USER-ID - User's unique identifier</li>
 *   <li>X-USER-EMAIL - User's email address</li>
 *   <li>X-USER-ROLE - User's role (ADMIN, CLIENT)</li>
 * </ul>
 * 
 * @see feign.RequestInterceptor
 */
@Component
@Slf4j
public class FeignAuthInterceptor implements RequestInterceptor {

    private static final String HEADER_USER_ID = "X-USER-ID";
    private static final String HEADER_USER_EMAIL = "X-USER-EMAIL";
    private static final String HEADER_USER_ROLE = "X-USER-ROLE";

    /**
     * Applies authentication headers to the outgoing Feign request.
     * 
     * <p>Extracts user identity headers from the current HTTP request context
     * and forwards them to the Feign request template.
     * 
     * @param template the Feign request template to modify
     */
    @Override
    public void apply(RequestTemplate template) {
        ServletRequestAttributes attrs =
                (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        // Return early if no request context available
        if (attrs == null) {
            log.debug("No request context available, skipping header forwarding");
            return;
        }

        var request = attrs.getRequest();

        // Extract user identity headers
        String userId = request.getHeader(HEADER_USER_ID);
        String email = request.getHeader(HEADER_USER_EMAIL);
        String role = request.getHeader(HEADER_USER_ROLE);

        // Forward headers if present
        if (userId != null) {
            template.header(HEADER_USER_ID, userId);
            log.debug("Forwarding header {} = {}", HEADER_USER_ID, userId);
        }

        if (email != null) {
            template.header(HEADER_USER_EMAIL, email);
            log.debug("Forwarding header {} = {}", HEADER_USER_EMAIL, email);
        }

        if (role != null) {
            template.header(HEADER_USER_ROLE, role);
            log.debug("Forwarding header {} = {}", HEADER_USER_ROLE, role);
        }

        log.debug("Feign request headers applied for target: {}", template.url());
    }

}
