package com.payment_service_api.service;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;

import com.payment_service_api.dto.PaymentRequest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationProducerService {

    private static final String TOPIC = "payment-notifications";

    private final KafkaTemplate<String, PaymentRequest> kafkaTemplate;

    public void sendPaymentNotification(PaymentRequest paymentRequest) {
        try {
            CompletableFuture<SendResult<String, PaymentRequest>> future = 
                kafkaTemplate.send(TOPIC, paymentRequest);

            future.whenComplete((result, ex) -> {
                if (ex == null) {
                    log.info("Sent payment notification message=[{}] with offset=[{}]", 
                        paymentRequest, result.getRecordMetadata().offset());
                } else {
                    log.error("Unable to send payment notification message=[{}] due to : {}", 
                        paymentRequest, ex.getMessage());
                }
            });
        } catch (Exception e) {
            log.error("Error sending payment notification to Kafka: {}", e.getMessage(), e);
        }
    }
}

