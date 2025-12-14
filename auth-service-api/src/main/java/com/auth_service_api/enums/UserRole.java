package com.auth_service_api.enums;

/**
 * Enumeration representing user roles in the system.
 * 
 * <p>User roles determine the permissions and access levels for users:
 * <ul>
 *   <li>{@code ADMIN}: Administrative users with full system access</li>
 *   <li>{@code CLIENT}: Regular users with limited access</li>
 * </ul>
 * 
 * <p>Roles are used for:
 * <ul>
 *   <li>Authorization checks via {@code @PreAuthorize} annotations</li>
 *   <li>JWT token claims</li>
 *   <li>Access control in controllers and services</li>
 * </ul>
 * 
 */
public enum UserRole {
    
    /**
     * Administrative role with full system access.
     * Admins can access all endpoints and manage all resources.
     */
    ADMIN,
    
    /**
     * Client role with limited access.
     * Clients can access their own resources and public endpoints.
     */
    CLIENT
}