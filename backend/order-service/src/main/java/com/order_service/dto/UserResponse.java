package com.order_service.dto;

import lombok.*;

/**
 * Data Transfer Object representing a user response.
 * 
 * <p>This DTO is used to transfer user data from the auth-service
 * when creating orders. Contains customer details for order records.
 * 
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    /**
     * Unique identifier for the user.
     */
    private Long id;

    /**
     * User's first name.
     */
    private String name;

    /**
     * User's last name.
     */
    private String lastName;

    /**
     * User's email address.
     */
    private String email;

    /**
     * User's role in the system (ADMIN, CLIENT).
     */
    private String role;

    /**
     * User's shipping address.
     */
    private String address;

    /**
     * User's contact phone number.
     */
    private String phone;

}
