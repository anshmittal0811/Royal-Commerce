package com.order_service.dto;

import lombok.*;

/**
 * Data Transfer Object representing a cart item response.
 * 
 * <p>This DTO is used to transfer cart item data from the shopping-service
 * when creating orders. Contains product details and quantity information.
 * 
 * @see CartResponse
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartItemResponse {

    /**
     * Unique identifier for the cart item.
     */
    private Long id;

    /**
     * Reference to the product ID in the product catalog.
     */
    private Long idProduct;

    /**
     * Name of the product.
     */
    private String nameProduct;

    /**
     * Quantity of the product in the cart.
     */
    private Integer quantity;

    /**
     * Unit price of the product.
     */
    private Double unitPrice;

}
