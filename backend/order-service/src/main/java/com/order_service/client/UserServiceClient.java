package com.order_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.order_service.dto.UserResponse;

/**
 * Feign client for communicating with the Auth Service API.
 * 
 * <p>This client provides methods to retrieve user information from the auth-service.
 * It uses service discovery to locate the auth-service instance.
 * 
 * <p>Authentication headers are automatically forwarded via {@link com.order_service.interceptor.FeignAuthInterceptor}.
 * 
 * @see UserResponse
 */
@FeignClient(name = "auth-service")
public interface UserServiceClient {

    /**
     * Retrieves user details by their unique identifier.
     * 
     * <p>This method calls the auth-service's internal client endpoint
     * to fetch user information for order processing.
     * 
     * @param id the unique identifier of the user
     * @return UserResponse containing user details
     */
    @GetMapping("/users/client/user/{id}")
    UserResponse getUserById(@PathVariable("id") Long id);

}
