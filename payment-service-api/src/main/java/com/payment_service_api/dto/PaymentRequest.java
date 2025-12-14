package com.payment_service_api.dto;

import lombok.*;
import java.time.LocalDateTime;
import com.payment_service_api.dto.OrderResponse.StatusOrder;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRequest {
    private Long orderId;
    private String userName;
    private String userEmail;
    private String userAddress;
    private String userPhone;
    private StatusOrder orderStatus;
    private LocalDateTime orderDate;
    private Double totalAmount;
}