package com.notification_service_api.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentResponse {
    private Long orderId;
    private String userName;
    private String userEmail;
    private String userAddress;
    private String userPhone;
    private StatusOrder orderStatus;
    private LocalDateTime orderDate;
    private Double totalAmount;

    public enum StatusOrder {
        PENDING, PROCESSING, COMPLETED
    }
}
