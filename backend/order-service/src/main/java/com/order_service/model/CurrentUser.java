package com.order_service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Model representing the currently authenticated user.
 * 
 * <p>This class holds user identity information extracted from:
 * <ul>
 *   <li>Spring Security Authentication object</li>
 *   <li>HTTP request headers (X-USER-EMAIL, X-USER-ROLE, X-USER-ID)</li>
 * </ul>
 * 
 * <p>Used by controllers to access current user information for authorization
 * and business logic decisions.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CurrentUser {

    /**
     * Email address of the current user.
     * Used as the primary identifier for user-related operations.
     */
    private String email;

    /**
     * Role of the current user (e.g., ADMIN, CLIENT).
     * Used for authorization decisions.
     */
    private String role;

    /**
     * Unique identifier of the current user.
     * References the user ID in the auth-service.
     */
    private Long userId;

}
