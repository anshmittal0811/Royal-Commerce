package com.shopping_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import com.shopping_service.dto.UserResponse;

/**
 * Feign client for communicating with the Auth Service API.
 * 
 * <p>This client provides methods to retrieve user information
 * for cart association and validation purposes.
 * 
 * <p>Uses service discovery via Eureka to locate the auth-service.
 */
@FeignClient(name = "auth-service")
public interface UserServiceClient {

    /**
     * Retrieves a user by their unique identifier.
     * 
     * @param id the user ID to retrieve
     * @return the user details, or null if not found
     */
    @GetMapping("/users/client/user/{id}")
    UserResponse getUserById(@PathVariable Long id);

}
