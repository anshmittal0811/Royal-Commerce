package com.auth_service_api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * Data Transfer Object for user login requests.
 * 
 * <p>This DTO contains the credentials required for user authentication:
 * <ul>
 *   <li>Email address (must be a valid email format)</li>
 *   <li>Password (required, non-blank)</li>
 * </ul>
 * 
 * <p>Used by the authentication service to validate and authenticate users.
 * 
 */
@Data
public class LoginRequest {

    /**
     * The user's email address used for authentication.
     * Must be a valid email format.
     */
    @NotBlank(message = "Email is required")
    @Email(message = "Email must be a valid email address")
    private String email;

    /**
     * The user's password for authentication.
     * Must not be blank.
     */
    @NotBlank(message = "Password is required")
    private String password;
}