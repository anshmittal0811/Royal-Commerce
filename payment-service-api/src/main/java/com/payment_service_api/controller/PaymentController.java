package com.payment_service_api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.payment_service_api.dto.OrderResponse;
import com.payment_service_api.entity.Payment;
import com.payment_service_api.feign.client.NotificationClient;
import com.payment_service_api.service.PaymentService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping("/payment")
@RequiredArgsConstructor
@Slf4j
public class PaymentController {

    private final PaymentService paymentService;
    private final NotificationClient notificationClient;

    @GetMapping("/{orderId}")
    private String viewPayment(@PathVariable Long orderId, Model model) {
        OrderResponse orderResponse = paymentService.viewOrderDetails(orderId);
        model.addAttribute("order", orderResponse);
        return "index";
    }

    @PostMapping("/create")
    public ResponseEntity<PaymentResponse> createPayment(
            @RequestParam("orderid") Long orderId,
            @RequestParam("method") String method,
            @RequestParam("amount") String amount,
            @RequestParam("currency") String currency,
            @RequestParam("description") String description) {

        String amounts = amount.replace(',', '.');
        Payment payment = paymentService.createPayment(
                orderId,
                Double.valueOf(amounts),
                currency,
                method,
                description);

        return ResponseEntity.ok(new PaymentResponse("SUCCESS", payment));
    }

    public record PaymentResponse(String status, Payment payment) {}

}