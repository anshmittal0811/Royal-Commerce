package com.order_service_api.service;

import java.util.List;

import com.order_service_api.dto.OrderResponse;
import com.order_service_api.entity.Order;
import com.order_service_api.exception.OrderCreationException;
import com.order_service_api.exception.OrderNotFoundException;

/**
 * Service interface for order management operations.
 * 
 * <p>Provides methods for creating, updating, and retrieving orders.
 * 
 */
public interface OrderService {

    /**
     * Creates a new order for the specified user based on their current cart.
     * 
     * @param idUser the unique identifier of the user placing the order
     * @return the created Order entity
     * @throws IllegalArgumentException if the user ID is null or invalid
     * @throws OrderCreationException if the order cannot be created
     */
    Order createOrder(Long idUser) throws IllegalArgumentException, OrderCreationException;

    /**
     * Updates an order status to PROCESSING.
     * 
     * @param orderId the unique identifier of the order to process
     * @return the updated Order entity with PROCESSING status
     * @throws IllegalArgumentException if the order ID is null or invalid
     * @throws OrderNotFoundException if no order exists with the provided ID
     */
    Order bringOrder(Long orderId) throws IllegalArgumentException, OrderNotFoundException;

    /**
     * Completes an order by updating its status to COMPLETED.
     * 
     * @param orderId the unique identifier of the order to complete
     * @return the updated Order entity with COMPLETED status
     * @throws IllegalArgumentException if the order ID is null or invalid
     * @throws OrderNotFoundException if no order exists with the provided ID
     */
    Order completeOrder(Long orderId) throws IllegalArgumentException, OrderNotFoundException;

    /**
     * Retrieves all orders placed by a specific user.
     * 
     * @param email the email address of the user whose orders to retrieve
     * @return a list of order responses, or an empty list if no orders exist
     * @throws IllegalArgumentException if the email is null or empty
     */
    List<OrderResponse> getOrdersByUser(String email) throws IllegalArgumentException;

    /**
     * Retrieves all orders in the system.
     * 
     * @return a list of all order responses, or an empty list if no orders exist
     */
    List<OrderResponse> getAllOrders();

}
