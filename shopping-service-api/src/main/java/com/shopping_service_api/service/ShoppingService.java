package com.shopping_service_api.service;

import com.shopping_service_api.entity.Cart;

public interface ShoppingService {
    Cart addToCart(Long idUser,Long idProduct, Integer quantity);
    Cart removeFromCart(Long idUser, Long idProduct);
    Cart sendCart(Long idUser);
    void clearCart(Long idUser);
}
