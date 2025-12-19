package com.order_service.dto;

import java.time.LocalDateTime;

import lombok.*;

import com.order_service.entity.Order.StatusOrder;

/**
 * Data Transfer Object representing an order response.
 * 
 * <p>This DTO is used to transfer order data to clients.
 * Contains essential order information for display purposes.
 * 
 * @see StatusOrder
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {

    /**
     * Unique identifier for the order.
     */
    private Long orderId;

    /**
     * Email address of the customer who placed the order.
     */
    private String email;

    /**
     * Total amount for the order.
     */
    private Double totalAmount;

    /**
     * Current status of the order (PENDING, PROCESSING, COMPLETED).
     */
    private StatusOrder orderStatus;

    /**
     * Date and time when the order was created.
     */
    private LocalDateTime orderDate;

}