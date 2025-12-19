package com.auth_service.dto;

import com.auth_service.enums.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * Data Transfer Object for user registration requests.
 * 
 * <p>This DTO contains all the information required to register a new user:
 * <ul>
 *   <li>Personal information (name, last name)</li>
 *   <li>Authentication credentials (email, password)</li>
 *   <li>User role (ADMIN or CLIENT)</li>
 *   <li>Optional contact information (address, phone)</li>
 * </ul>
 * 
 * <p>Used by the authentication service to create new user accounts.
 * 
 */
@Data
public class RegisterRequest {

    /**
     * The user's first name.
     * Required, must not be blank.
     */
    @NotBlank(message = "Name is required")
    @Size(min = 1, max = 100, message = "Name must be between 1 and 100 characters")
    private String name;

    /**
     * The user's last name.
     * Required, must not be blank.
     */
    @NotBlank(message = "Last name is required")
    @Size(min = 1, max = 100, message = "Last name must be between 1 and 100 characters")
    private String lastName;

    /**
     * The user's email address.
     * Must be unique in the system and in valid email format.
     */
    @NotBlank(message = "Email is required")
    @Email(message = "Email must be a valid email address")
    private String email;

    /**
     * The user's password.
     * Required, must meet minimum length requirements.
     */
    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;

    /**
     * The user's role in the system.
     * Must be either ADMIN or CLIENT.
     */
    @NotNull(message = "User role is required")
    private UserRole role;

    /**
     * The user's address.
     * Optional field.
     */
    private String address;

    /**
     * The user's phone number.
     * Optional field.
     */
    private String phone;
}