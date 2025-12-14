package com.gateway_service_api.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import javax.crypto.SecretKey;

/**
 * Gateway filter factory for JWT-based authentication.
 * 
 * <p>This filter intercepts incoming requests and:
 * <ul>
 *   <li>Validates the JWT token from the Authorization header</li>
 *   <li>Extracts user claims (email, role, userId)</li>
 *   <li>Propagates user identity to downstream services via headers</li>
 * </ul>
 * 
 * <p>Headers added to downstream requests:
 * <ul>
 *   <li>X-USER-ID - The authenticated user's ID</li>
 *   <li>X-USER-EMAIL - The authenticated user's email</li>
 *   <li>X-USER-ROLE - The authenticated user's role</li>
 *   <li>X-FORWARDED-AUTH - Flag indicating authentication was performed</li>
 * </ul>
 * 
 * <p>Requests without valid JWT tokens receive a 401 Unauthorized response.
 */
@Slf4j
@Component
public class JwtAuthFilterGatewayFilterFactory
        extends AbstractGatewayFilterFactory<JwtAuthFilterGatewayFilterFactory.Config> {

    private static final String BEARER_PREFIX = "Bearer ";
    private static final String HEADER_USER_ID = "X-USER-ID";
    private static final String HEADER_USER_EMAIL = "X-USER-EMAIL";
    private static final String HEADER_USER_ROLE = "X-USER-ROLE";
    private static final String HEADER_FORWARDED_AUTH = "X-FORWARDED-AUTH";

    private final SecretKey key;

    /**
     * Constructs the JWT authentication filter factory.
     * 
     * @param secret the JWT signing secret from configuration
     */
    public JwtAuthFilterGatewayFilterFactory(@Value("${jwt.secret}") String secret) {
        super(Config.class);
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
        log.info("JWT authentication filter initialized");
    }

    /**
     * Empty configuration class for the gateway filter.
     * Can be extended to add configurable properties if needed.
     */
    public static class Config {
        // Configuration properties can be added here if needed
    }

    /**
     * Creates and returns the gateway filter for JWT authentication.
     * 
     * <p>The filter performs the following steps:
     * <ol>
     *   <li>Extracts the Authorization header</li>
     *   <li>Validates the Bearer token format</li>
     *   <li>Parses and validates the JWT token</li>
     *   <li>Extracts user claims from the token</li>
     *   <li>Adds user identity headers to the request</li>
     *   <li>Forwards the request to downstream services</li>
     * </ol>
     * 
     * @param config the filter configuration (currently unused)
     * @return the configured GatewayFilter
     */
    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String path = exchange.getRequest().getURI().getPath();
            String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

            log.debug("Processing request to path: {}", path);

            // Validate Authorization header presence and format
            if (authHeader == null || !authHeader.startsWith(BEARER_PREFIX)) {
                log.warn("Missing or invalid Authorization header for path: {}", path);
                return respondWithError(exchange, HttpStatus.UNAUTHORIZED, "Missing or invalid Authorization header");
            }

            String token = authHeader.substring(BEARER_PREFIX.length());

            try {
                // Parse and validate JWT token
                Claims claims = parseToken(token);

                // Extract user claims
                String email = claims.getSubject();
                String role = claims.get("role", String.class);
                Long userIdLong = claims.get("userId", Long.class);

                // Validate required claims
                if (!validateClaims(email, role, userIdLong, path)) {
                    return respondWithError(exchange, HttpStatus.UNAUTHORIZED, "Invalid token claims");
                }

                String userId = userIdLong.toString();

                log.info("Authenticated user: {} (ID: {}) with role: {} for path: {}", 
                        email, userId, role, path);

                // Add user identity headers and forward request
                ServerHttpRequest mutatedRequest = addUserHeaders(exchange.getRequest(), userId, email, role);

                return chain.filter(exchange.mutate().request(mutatedRequest).build());

            } catch (ExpiredJwtException e) {
                log.warn("JWT token expired for path: {} - {}", path, e.getMessage());
                return respondWithError(exchange, HttpStatus.UNAUTHORIZED, "Token has expired");

            } catch (MalformedJwtException e) {
                log.warn("Malformed JWT token for path: {} - {}", path, e.getMessage());
                return respondWithError(exchange, HttpStatus.UNAUTHORIZED, "Invalid token format");

            } catch (SignatureException e) {
                log.warn("Invalid JWT signature for path: {} - {}", path, e.getMessage());
                return respondWithError(exchange, HttpStatus.UNAUTHORIZED, "Invalid token signature");

            } catch (JwtException e) {
                log.warn("JWT validation failed for path: {} - {}", path, e.getMessage());
                return respondWithError(exchange, HttpStatus.UNAUTHORIZED, "Token validation failed");

            } catch (Exception e) {
                log.error("Unexpected error during JWT validation for path: {}", path, e);
                return respondWithError(exchange, HttpStatus.INTERNAL_SERVER_ERROR, "Authentication error");
            }
        };
    }

    // ==================== Private Helper Methods ====================

    /**
     * Parses and validates a JWT token.
     * 
     * @param token the JWT token string
     * @return the token claims
     * @throws JwtException if token parsing or validation fails
     */
    private Claims parseToken(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * Validates that all required claims are present in the token.
     * 
     * @param email the user email claim
     * @param role the user role claim
     * @param userId the user ID claim
     * @param path the request path for logging
     * @return true if all claims are valid, false otherwise
     */
    private boolean validateClaims(String email, String role, Long userId, String path) {
        if (email == null || email.isBlank()) {
            log.warn("Missing email claim in token for path: {}", path);
            return false;
        }
        if (role == null || role.isBlank()) {
            log.warn("Missing role claim in token for path: {}", path);
            return false;
        }
        if (userId == null) {
            log.warn("Missing userId claim in token for path: {}", path);
            return false;
        }
        return true;
    }

    /**
     * Adds user identity headers to the request for downstream services.
     * 
     * @param request the original request
     * @param userId the user ID
     * @param email the user email
     * @param role the user role
     * @return the mutated request with added headers
     */
    private ServerHttpRequest addUserHeaders(ServerHttpRequest request, String userId, String email, String role) {
        return request.mutate()
                .header(HEADER_USER_ID, userId)
                .header(HEADER_USER_EMAIL, email)
                .header(HEADER_USER_ROLE, role)
                .header(HEADER_FORWARDED_AUTH, "true")
                .build();
    }

    /**
     * Responds with an error status code.
     * 
     * @param exchange the server web exchange
     * @param status the HTTP status code to return
     * @param message the error message (for logging purposes)
     * @return a Mono that completes the response
     */
    private Mono<Void> respondWithError(ServerWebExchange exchange, HttpStatus status, String message) {
        log.debug("Responding with {} - {}", status, message);
        exchange.getResponse().setStatusCode(status);
        return exchange.getResponse().setComplete();
    }

}
