package com.shopping_service_api.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CurrentUser {
    private String email;
    private String role;
    private Long userId;
}