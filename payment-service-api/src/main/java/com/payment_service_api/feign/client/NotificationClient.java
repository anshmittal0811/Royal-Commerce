package com.payment_service_api.feign.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import com.payment_service_api.dto.PaymentRequest;

@FeignClient(name = "notification-service-api")
public interface NotificationClient {

    @PostMapping("/notifications/email")
    void sendEmail(@RequestBody PaymentRequest payRequest);

    @PostMapping("/notifications/sms")
    void sendSms(@RequestParam("phoneNumber") String phoneNumber, @RequestParam("message") String message);

}