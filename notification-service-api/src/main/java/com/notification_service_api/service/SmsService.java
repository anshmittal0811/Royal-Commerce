package com.notification_service_api.service;

import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SmsService {
    public void sendSms(String toPhoneNumber, String messageBody) {
        log.info("SMS containing message: {} sent to {}", messageBody, toPhoneNumber);
    }
}