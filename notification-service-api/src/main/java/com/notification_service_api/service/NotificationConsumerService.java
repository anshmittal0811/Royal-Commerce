package com.notification_service_api.service;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.notification_service_api.dto.PaymentResponse;
import com.notification_service_api.dto.PaymentResponse.StatusOrder;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationConsumerService {

    private final EmailService emailService;

    @KafkaListener(topics = "payment-notifications", groupId = "notification-service-group")
    public void consumePaymentNotification(PaymentNotificationMessage message) {
        log.info("Received payment notification message: {}", message);
        
        try {
            // Convert the message to PaymentResponse
            PaymentResponse paymentResponse = PaymentResponse.builder()
                    .orderId(message.getOrderId())
                    .userName(message.getUserName())
                    .userEmail(message.getUserEmail())
                    .userAddress(message.getUserAddress())
                    .userPhone(message.getUserPhone())
                    .orderStatus(mapStatusOrder(message.getOrderStatus()))
                    .orderDate(message.getOrderDate() != null ? message.getOrderDate() : LocalDateTime.now())
                    .totalAmount(message.getTotalAmount())
                    .build();

            // Send email notification
            emailService.sendEmail(paymentResponse);
            log.info("Email notification sent successfully for order: {}", message.getOrderId());
        } catch (Exception e) {
            log.error("Error processing payment notification for order {}: {}", 
                message.getOrderId(), e.getMessage(), e);
        }
    }

    private StatusOrder mapStatusOrder(String status) {
        if (status == null) {
            return StatusOrder.COMPLETED;
        }
        try {
            // Handle enum string format (e.g., "COMPLETED" or "com.payment_service_api.dto.OrderResponse$StatusOrder:COMPLETED")
            String statusValue = status;
            if (status.contains(":")) {
                statusValue = status.substring(status.lastIndexOf(':') + 1);
            }
            return StatusOrder.valueOf(statusValue.toUpperCase());
        } catch (IllegalArgumentException e) {
            log.warn("Unknown order status: {}, defaulting to COMPLETED", status);
            return StatusOrder.COMPLETED;
        }
    }

    @Getter
    @Setter
    public static class PaymentNotificationMessage {
        private Long orderId;
        private String userName;
        private String userEmail;
        private String userAddress;
        private String userPhone;
        private String orderStatus;
        private LocalDateTime orderDate;
        private Double totalAmount;

        @Override
        public String toString() {
            return "PaymentNotificationMessage{" +
                    "orderId=" + orderId +
                    ", userName='" + userName + '\'' +
                    ", userEmail='" + userEmail + '\'' +
                    ", totalAmount=" + totalAmount +
                    '}';
        }
    }

}