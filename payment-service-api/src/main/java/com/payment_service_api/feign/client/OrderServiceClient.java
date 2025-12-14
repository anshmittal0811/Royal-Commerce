package com.payment_service_api.feign.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import com.payment_service_api.dto.OrderResponse;

@FeignClient(name = "order-service-api")
public interface OrderServiceClient {

    @GetMapping("/orders/bring/{orderId}")
    OrderResponse bringOrder(@PathVariable Long orderId);

    @PostMapping("/orders/complete/{orderId}")
    OrderResponse completeOrder(@PathVariable Long orderId);

}