package com.payment_service_api.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemResponse {
    private Long id;
    private Long idProduct;
    private String nameProduct;
    private Integer quantity;
    private Double unitPrice;   
    private Double totalPrice;    
}