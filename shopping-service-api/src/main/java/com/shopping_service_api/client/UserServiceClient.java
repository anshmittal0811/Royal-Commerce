package com.shopping_service_api.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import com.shopping_service_api.dto.UserResponse;

@FeignClient(name = "auth-service-api")
public interface UserServiceClient {

    @GetMapping("/users/client/user/{id}")
    UserResponse getUserById(@PathVariable Long id);

}