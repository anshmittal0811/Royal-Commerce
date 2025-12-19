package com.order_service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.order_service.entity.Order;

/**
 * Repository interface for Order entity operations.
 * 
 * <p>This repository extends JpaRepository, providing standard CRUD operations
 * and custom query methods for Order entities.
 * 
 * <p>Provides methods for:
 * <ul>
 *   <li>Standard CRUD operations (inherited from JpaRepository)</li>
 *   <li>Finding orders by customer email</li>
 * </ul>
 * 
 * @see Order
 */
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    /**
     * Finds all orders placed by a customer with the given email address.
     * 
     * <p>Returns orders in the default order (typically by ID).
     * Consider adding ordering for production use.
     * 
     * @param email the customer's email address to search for
     * @return a list of orders placed by the customer, empty if none found
     */
    List<Order> findByEmail(String email);

}
