package com.auth_service_api.util;

import com.auth_service_api.enums.UserRole;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

/**
 * Utility class for JWT (JSON Web Token) operations.
 * 
 * <p>This utility provides functionality for:
 * <ul>
 *   <li>Generating JWT tokens with user information</li>
 *   <li>Validating JWT tokens and extracting claims</li>
 * </ul>
 * 
 * <p>JWT tokens contain:
 * <ul>
 *   <li>Subject: user's email address</li>
 *   <li>Claims: userId and role</li>
 *   <li>Issued at: token creation timestamp</li>
 *   <li>Expiration: token expiration timestamp</li>
 * </ul>
 * 
 * <p>Configuration properties:
 * <ul>
 *   <li>{@code jwt.secret}: Secret key for signing tokens</li>
 *   <li>{@code jwt.expiration}: Token expiration time in milliseconds</li>
 * </ul>
 * 
 */
@Component
@Slf4j
public class JwtUtil {
    
    private final Key key;
    private final long expiration;

    /**
     * Constructs a JwtUtil instance with the provided secret and expiration.
     * 
     * @param secret the secret key for signing tokens (from application properties)
     * @param expiration the token expiration time in milliseconds (from application properties)
     */
    public JwtUtil(@Value("${jwt.secret}") String secret,
                   @Value("${jwt.expiration}") long expiration) {
        log.debug("Initializing JwtUtil with expiration: {} ms", expiration);
        
        if (secret == null || secret.isBlank()) {
            throw new IllegalArgumentException("JWT secret cannot be null or blank");
        }
        
        if (expiration <= 0) {
            throw new IllegalArgumentException("JWT expiration must be positive");
        }
        
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
        this.expiration = expiration;
        
        log.info("JwtUtil initialized successfully with expiration: {} ms ({} minutes)", 
                expiration, expiration / 60000);
    }

    /**
     * Generates a JWT token for the specified user.
     * 
     * <p>The token includes:
     * <ul>
     *   <li>Subject: user's email</li>
     *   <li>userId claim: user's unique identifier</li>
     *   <li>role claim: user's role (ADMIN or CLIENT)</li>
     *   <li>Issued at: current timestamp</li>
     *   <li>Expiration: current timestamp + expiration period</li>
     * </ul>
     * 
     * @param userId the user's unique identifier
     * @param email the user's email address (used as subject)
     * @param role the user's role
     * @return a signed JWT token string
     * @throws IllegalArgumentException if any parameter is null or invalid
     */
    public String generateToken(Long userId, String email, UserRole role) {
        log.debug("Generating JWT token for user ID: {}, email: {}, role: {}", 
                userId, email, role);

        if (userId == null || userId <= 0) {
            log.error("Invalid userId provided: {}", userId);
            throw new IllegalArgumentException("User ID must be a positive number");
        }

        if (email == null || email.isBlank()) {
            log.error("Invalid email provided");
            throw new IllegalArgumentException("Email cannot be null or blank");
        }

        if (role == null) {
            log.error("Invalid role provided");
            throw new IllegalArgumentException("Role cannot be null");
        }

        try {
            long now = System.currentTimeMillis();
            Date issuedAt = new Date(now);
            Date expirationDate = new Date(now + expiration);

            String token = Jwts.builder()
                    .subject(email)
                    .claim("userId", userId)
                    .claim("role", role.name())
                    .issuedAt(issuedAt)
                    .expiration(expirationDate)
                    .signWith(key)
                    .compact();

            log.info("JWT token generated successfully for user ID: {}, email: {}", 
                    userId, email);
            log.debug("Token expiration: {}", expirationDate);

            return token;

        } catch (Exception e) {
            log.error("Error generating JWT token for user ID: {}, email: {}", 
                    userId, email, e);
            throw new RuntimeException("Failed to generate JWT token: " + e.getMessage(), e);
        }
    }

    /**
     * Validates a JWT token and extracts its claims.
     * 
     * <p>This method:
     * <ol>
     *   <li>Parses the token</li>
     *   <li>Verifies the signature</li>
     *   <li>Checks token expiration</li>
     *   <li>Returns the claims if valid</li>
     * </ol>
     * 
     * @param token the JWT token string to validate
     * @return the Claims object containing token information
     * @throws io.jsonwebtoken.JwtException if the token is invalid, expired, or malformed
     * @throws IllegalArgumentException if the token is null or blank
     */
    public Claims validateAndGetClaims(String token) {
        log.debug("Validating JWT token");

        if (token == null || token.isBlank()) {
            log.error("Token is null or blank");
            throw new IllegalArgumentException("Token cannot be null or blank");
        }

        try {
            Claims claims = Jwts.parser()
                    .verifyWith((SecretKey) key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            log.debug("Token validated successfully for subject: {}", claims.getSubject());
            
            return claims;

        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            log.warn("Token validation failed: Token expired");
            throw e;
        } catch (io.jsonwebtoken.JwtException e) {
            log.warn("Token validation failed: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("Unexpected error during token validation", e);
            throw new RuntimeException("Token validation failed: " + e.getMessage(), e);
        }
    }
}