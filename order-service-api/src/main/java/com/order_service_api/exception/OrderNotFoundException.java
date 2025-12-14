package com.order_service_api.exception;

/**
 * Exception thrown when attempting to retrieve an order that does not exist in the system.
 * This exception indicates that the requested order ID does not correspond to any existing order.
 */
public class OrderNotFoundException extends RuntimeException {

    /**
     * Constructs a new OrderNotFoundException with the specified order ID.
     *
     * @param orderId the order ID that was not found
     */
    public OrderNotFoundException(Long orderId) {
        super(String.format("Order not found with ID: %d", orderId));
    }

    /**
     * Constructs a new OrderNotFoundException with the specified order ID and cause.
     *
     * @param orderId the order ID that was not found
     * @param cause the cause of this exception
     */
    public OrderNotFoundException(Long orderId, Throwable cause) {
        super(String.format("Order not found with ID: %d", orderId), cause);
    }

}

