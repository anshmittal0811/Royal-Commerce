package com.payment_service_api.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private Long orderId;
    private String name;
    private String lastName;
    private String email;
    private String role;
    private String address;
    private String phone;
    private List<OrderItemResponse> items;   
    private Double totalAmount;     
    private StatusOrder orderStatus;  
    private LocalDateTime orderDate;

    public enum StatusOrder {
        PENDING, PROCESSING, COMPLETED
    }
}