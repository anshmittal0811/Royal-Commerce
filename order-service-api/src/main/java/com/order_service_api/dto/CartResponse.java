package com.order_service_api.dto;

import java.util.List;

import lombok.*;

/**
 * Data Transfer Object representing a shopping cart response.
 * 
 * <p>This DTO is used to transfer cart data from the shopping-service
 * when creating orders. Contains user information, cart items, and total.
 * 
 * @see CartItemResponse
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartResponse {

    /**
     * Unique identifier for the cart.
     */
    private Long id;

    /**
     * Reference to the user ID who owns this cart.
     */
    private Long idUser;

    /**
     * Email address of the cart owner.
     */
    private String email;

    /**
     * Total price of all items in the cart.
     */
    private Double total;

    /**
     * List of items in the cart.
     */
    private List<CartItemResponse> cartItems;

}
