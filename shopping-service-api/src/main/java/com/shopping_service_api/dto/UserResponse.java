package com.shopping_service_api.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {
    private Long id;
    private String name;
    private String lastName;
    private String email;
    private String role;
    private String address;
    private String phone;
}