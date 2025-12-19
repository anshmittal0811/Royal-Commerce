package com.order_service.exception;

/**
 * Exception thrown when an error occurs during order creation.
 * This exception indicates that the order could not be created due to an underlying issue
 * such as cart retrieval failure, user validation failure, or persistence error.
 */
public class OrderCreationException extends RuntimeException {

    /**
     * Constructs a new OrderCreationException with the specified message.
     *
     * @param message the detail message
     */
    public OrderCreationException(String message) {
        super(message);
    }

    /**
     * Constructs a new OrderCreationException with the specified message and cause.
     *
     * @param message the detail message
     * @param cause the cause of this exception
     */
    public OrderCreationException(String message, Throwable cause) {
        super(message, cause);
    }

}

