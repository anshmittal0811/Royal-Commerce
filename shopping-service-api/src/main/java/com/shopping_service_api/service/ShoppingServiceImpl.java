package com.shopping_service_api.service;
import java.util.ArrayList;

import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.shopping_service_api.client.ProductServiceClient;
import com.shopping_service_api.client.UserServiceClient;
import com.shopping_service_api.dto.ProductResponse;
import com.shopping_service_api.dto.UserResponse;
import com.shopping_service_api.entity.Cart;
import com.shopping_service_api.entity.CartItem;
import com.shopping_service_api.repository.CartRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class ShoppingServiceImpl implements ShoppingService {

    private final ProductServiceClient productServiceClient;
    private final UserServiceClient userServiceClient;
    private final CartRepository cartRepository;

    @Override
    public Cart addToCart(Long idUser, Long idProduct, Integer quantity) {
        ProductResponse product = productServiceClient.findProductById(idProduct);
        if (product == null) {
            throw new IllegalArgumentException("The product does not exist.");
        }

        Cart cart = cartRepository.findByIdUser(idUser);

        Integer stock = product.getStock();
        if (stock - quantity >= 0) {
            UserResponse user = userServiceClient.getUserById(idUser);
            if (user == null) {
                throw new IllegalArgumentException("The user does not exist.");
            }

            if (cart == null) {
                cart = Cart.builder()
                        .idUser(user.getId())
                        .email(user.getEmail())
                        .total(0.0)
                        .cartItems(new ArrayList<>())
                        .build();
            }

            CartItem cartItem = cart.getCartItems().stream()
                    .filter(item -> item.getIdProduct().equals(idProduct))
                    .findFirst()
                    .orElse(null);

            if (cartItem != null) {
                cartItem.setQuantity(cartItem.getQuantity() + quantity);
            } else {
                cartItem = CartItem.builder()
                        .idProduct(idProduct)
                        .nameProduct(product.getName())
                        .quantity(quantity)
                        .unitPrice(product.getPrice())
                        .cart(cart)
                        .build();
                cart.getCartItems().add(cartItem);
            }

            productServiceClient.updateStockProduct(idProduct, quantity);

            Double newTotal = cart.getCartItems().stream()
                    .mapToDouble(item -> item.getQuantity() * item.getUnitPrice())
                    .sum();

            cart.setTotal(newTotal);
        } else {
            throw new IllegalArgumentException("Insufficient stock.");
        }

        return cartRepository.save(cart);
    }

    @Override
    public Cart removeFromCart(Long idUser, Long idProduct) {
        Cart cart = cartRepository.findByIdUser(idUser);
        if (cart == null) {
            throw new IllegalArgumentException("The user's cart does not exist.");
        }
        CartItem itemToDelete = cart.getCartItems().stream()
                .filter(item -> item.getIdProduct().equals(idProduct))
                .findFirst()
                .orElse(null);
        if (itemToDelete == null) {
            throw new IllegalArgumentException("The product is not in the cart.");
        }
        cart.getCartItems().remove(itemToDelete);
        Double newTotal = cart.getCartItems().stream()
                .mapToDouble(item -> item.getQuantity() * item.getUnitPrice())
                .sum();
        cart.setTotal(newTotal);
        return cartRepository.save(cart);
    }

    @Override
    public Cart sendCart(Long idUser) {
        Cart cartToSend = cartRepository.findByIdUser(idUser);
        if (cartToSend == null) {
            throw new IllegalArgumentException("The user's cart does not exist.");
        }
        return cartToSend;
    }

    @Override
    public void clearCart(Long idUser) {
        Cart cart = cartRepository.findByIdUser(idUser);
        cart.setTotal(0.0);
        cart.getCartItems().clear();
        cartRepository.save(cart);
    }

}