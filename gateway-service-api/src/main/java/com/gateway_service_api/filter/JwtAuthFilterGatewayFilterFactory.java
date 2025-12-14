package com.gateway_service_api.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import javax.crypto.SecretKey;

@Slf4j
@Component
public class JwtAuthFilterGatewayFilterFactory
        extends AbstractGatewayFilterFactory<JwtAuthFilterGatewayFilterFactory.Config> {

    private final SecretKey key;

    public JwtAuthFilterGatewayFilterFactory(@Value("${jwt.secret}") String secret) {
        super(Config.class);
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public static class Config { }

    @Override
    public GatewayFilter apply(Config config) {

        return (exchange, chain) -> {

            String path = exchange.getRequest().getURI().getPath();
            String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                log.warn("Missing or invalid Authorization header for {}", path);
                return respond(exchange, HttpStatus.UNAUTHORIZED);
            }

            String token = authHeader.substring(7);

            try {
                Claims claims = Jwts.parser()
                        .verifyWith(key)
                        .build()
                        .parseSignedClaims(token)
                        .getPayload();

                String email = claims.getSubject();
                String role = claims.get("role", String.class);
                String userId = claims.get("userId", Long.class).toString();

                if (email == null || role == null || userId == null) {
                    log.warn("Missing claims in token");
                    return respond(exchange, HttpStatus.UNAUTHORIZED);
                }

                log.info("Authenticated user {} with role {}", email, role);

                // Add headers for downstream
                var mutatedReq = exchange.getRequest().mutate()
                        .header("X-USER-ID", userId)
                        .header("X-USER-EMAIL", email)
                        .header("X-USER-ROLE", role)
                        .header("X-FORWARDED-AUTH", "true")
                        .build();

                return chain.filter(exchange.mutate().request(mutatedReq).build());

            } catch (Exception ex) {
                log.warn("JWT validation failed: {}", ex.getMessage());
                return respond(exchange, HttpStatus.UNAUTHORIZED);
            }
        };
    }

    private Mono<Void> respond(ServerWebExchange exchange, HttpStatus status) {
        exchange.getResponse().setStatusCode(status);
        return exchange.getResponse().setComplete();
    }
    
}