package com.product_service.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Set;

/**
 * Filter that extracts authentication information from HTTP headers set by the API Gateway.
 * 
 * <p>This filter is responsible for:
 * <ul>
 *   <li>Extracting user authentication details from gateway-validated headers</li>
 *   <li>Setting up Spring Security context with user information</li>
 *   <li>Enabling method-level security annotations to work properly</li>
 * </ul>
 * 
 * <p>The filter expects the following headers to be set by the gateway after JWT validation:
 * <ul>
 *   <li>{@code X-USER-EMAIL}: The authenticated user's email</li>
 *   <li>{@code X-USER-ID}: The authenticated user's unique identifier</li>
 *   <li>{@code X-USER-ROLE}: The authenticated user's role (ADMIN or CLIENT)</li>
 * </ul>
 * 
 * <p>If all required headers are present, the filter creates an authentication token
 * and sets it in the SecurityContext. If headers are missing, the request continues
 * without authentication, allowing public endpoints to be accessed.
 * 
 */
@Component
@Slf4j
public class HeaderAuthenticationFilter extends OncePerRequestFilter {

    private static final String USER_EMAIL_HEADER = "X-USER-EMAIL";
    private static final String USER_ID_HEADER = "X-USER-ID";
    private static final String USER_ROLE_HEADER = "X-USER-ROLE";
    
    private static final Set<String> VALID_ROLES = Set.of("ADMIN", "CLIENT");

    /**
     * Processes the HTTP request to extract authentication headers and set up security context.
     * 
     * <p>This method:
     * <ol>
     *   <li>Extracts authentication headers from the request</li>
     *   <li>Validates that all required headers are present</li>
     *   <li>Validates the role value</li>
     *   <li>Creates and sets the authentication token in SecurityContext</li>
     *   <li>Continues the filter chain</li>
     * </ol>
     * 
     * @param request the HTTP servlet request
     * @param response the HTTP servlet response
     * @param filterChain the filter chain to continue processing
     * @throws ServletException if a servlet error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) 
            throws ServletException, IOException {

        String requestUri = request.getRequestURI();
        log.debug("Processing authentication filter for request: {} {}", 
                request.getMethod(), requestUri);

        // Extract authentication headers set by gateway
        String email = request.getHeader(USER_EMAIL_HEADER);
        String userId = request.getHeader(USER_ID_HEADER);
        String role = request.getHeader(USER_ROLE_HEADER);

        log.debug("Extracted headers - Email: {}, UserId: {}, Role: {}", email, userId, role);

        // Only set authentication context if gateway validated token and added all required headers
        if (hasAllRequiredHeaders(email, userId, role)) {
            if (isValidRole(role)) {
                setAuthenticationContext(email, userId, role, requestUri);
            } else {
                log.warn("Invalid role '{}' in header for request: {}", role, requestUri);
            }
        } else {
            log.debug("Missing authentication headers for request: {} - proceeding without authentication", 
                    requestUri);
        }

        // Continue filter chain
        filterChain.doFilter(request, response);
    }

    /**
     * Checks if all required authentication headers are present and non-empty.
     * 
     * @param email the user email header value
     * @param userId the user ID header value
     * @param role the user role header value
     * @return true if all headers are present and non-empty, false otherwise
     */
    private boolean hasAllRequiredHeaders(String email, String userId, String role) {
        return StringUtils.hasText(email) 
                && StringUtils.hasText(userId) 
                && StringUtils.hasText(role);
    }

    /**
     * Validates that the role value is one of the allowed roles.
     * 
     * @param role the role value to validate
     * @return true if the role is valid, false otherwise
     */
    private boolean isValidRole(String role) {
        return role != null && VALID_ROLES.contains(role.toUpperCase());
    }

    /**
     * Sets up the Spring Security authentication context with the provided user information.
     * 
     * @param email the authenticated user's email
     * @param userId the authenticated user's ID
     * @param role the authenticated user's role
     * @param requestUri the request URI for logging purposes
     */
    private void setAuthenticationContext(String email, String userId, String role, String requestUri) {
        try {
            // Create authority from role (normalize to uppercase for consistency)
            String normalizedRole = role.toUpperCase();
            SimpleGrantedAuthority authority = new SimpleGrantedAuthority(normalizedRole);
            
            // Create authentication token with email as principal, no credentials, and role as authority
            UsernamePasswordAuthenticationToken authentication = 
                    new UsernamePasswordAuthenticationToken(email, null, List.of(authority));
            
            // Store userId in details for potential use in controllers
            authentication.setDetails(userId);
            
            // Set authentication in security context
            SecurityContextHolder.getContext().setAuthentication(authentication);
            
            log.info("Authentication context set for user: {} (ID: {}, Role: {}) on request: {}", 
                    email, userId, normalizedRole, requestUri);
            
        } catch (Exception e) {
            log.error("Error setting authentication context for user: {} on request: {}", 
                    email, requestUri, e);
            // Don't throw exception - allow request to continue without authentication
            // This prevents a single bad header from breaking the entire application
        }
    }
}