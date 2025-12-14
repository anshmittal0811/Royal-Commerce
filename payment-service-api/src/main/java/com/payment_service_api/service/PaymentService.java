package com.payment_service_api.service;

import org.springframework.stereotype.Service;

import com.payment_service_api.dto.OrderResponse;
import com.payment_service_api.dto.PaymentRequest;
import com.payment_service_api.entity.Payment;
import com.payment_service_api.feign.client.OrderServiceClient;
import com.payment_service_api.repository.PaymentRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {

    private final OrderServiceClient orderServiceClient;
    private final PaymentRepository paymentRepository;
    private final NotificationProducerService notificationProducerService;

    public OrderResponse viewOrderDetails(Long idOrder){
        return orderServiceClient.bringOrder(idOrder);
    }

    public Payment createPayment(
            Long orderId,
            Double total,
            String currency,
            String method,
            String description
    ){
        Payment payment = Payment.builder()
                                .orderId(orderId)
                                .total(total)
                                .currency(currency)
                                .description(description)
                                .method(method)
                                .status("SUCCESS")
                                .build();
        orderServiceClient.completeOrder(orderId);
        Payment savedPayment = paymentRepository.save(payment);

        // Send notification asynchronously via Kafka
        try {
            OrderResponse orderResponse = orderServiceClient.bringOrder(orderId);
            PaymentRequest paymentRequest = buildPaymentRequest(orderResponse, savedPayment);
            notificationProducerService.sendPaymentNotification(paymentRequest);
            log.info("Payment notification sent to Kafka for order: {}", orderId);
        } catch (Exception e) {
            log.error("Error sending payment notification to Kafka for order {}: {}", 
                orderId, e.getMessage(), e);
        }

        return savedPayment;
    }

    private PaymentRequest buildPaymentRequest(OrderResponse orderResponse, Payment payment) {
        return PaymentRequest.builder()
                .orderId(orderResponse.getOrderId())
                .userName(orderResponse.getName() + " " + orderResponse.getLastName())
                .userEmail(orderResponse.getEmail())
                .userAddress(orderResponse.getAddress())
                .userPhone(orderResponse.getPhone())
                .orderStatus(orderResponse.getOrderStatus())
                .orderDate(orderResponse.getOrderDate() != null ? orderResponse.getOrderDate() : LocalDateTime.now())
                .totalAmount(payment.getTotal())
                .build();
    }

}