package com.shopping_service_api.controller;

import com.shopping_service_api.model.CurrentUser;
import com.shopping_service_api.dto.ProductRequest;
import jakarta.servlet.http.HttpServletRequest;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.shopping_service_api.entity.Cart;
import com.shopping_service_api.service.ShoppingService;

@RestController
@RequestMapping("/shopping")
@RequiredArgsConstructor
@Slf4j
public class ShoppingController {

    private final ShoppingService shoppingService;

    @PostMapping("/add-to-cart")
    public ResponseEntity<?> addToCart(Authentication auth, HttpServletRequest request, @RequestBody ProductRequest productRequest) {
        CurrentUser user = buildCurrentUser(auth, request);
        try {
            Cart cart = shoppingService.addToCart(user.getUserId(), productRequest.getIdProduct(), productRequest.getQuantity());
            return new ResponseEntity<>(cart, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error adding product to the cart: " + e.getMessage(),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/remove-from-cart")
    public ResponseEntity<?> removeFromCart(Authentication auth, HttpServletRequest request, @RequestBody ProductRequest productRequest) {
        CurrentUser user = buildCurrentUser(auth, request);
        try {
            Cart cart = shoppingService.removeFromCart(user.getUserId(), productRequest.getIdProduct());
            return new ResponseEntity<>(cart, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error removing product from the cart: " + e.getMessage(),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/send-cart")
    public ResponseEntity<?> sendCart(Authentication auth, HttpServletRequest request) {
        CurrentUser user = buildCurrentUser(auth, request);
        try {
            Cart cart = shoppingService.sendCart(user.getUserId());
            return new ResponseEntity<>(cart, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error submitting the cart: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/clear-cart")
    public void cleanCart(Authentication auth, HttpServletRequest request){
        CurrentUser user = buildCurrentUser(auth, request);
        shoppingService.clearCart(user.getUserId());
    }

    private CurrentUser buildCurrentUser(Authentication auth, HttpServletRequest request) {
        String email = (auth != null) ? auth.getName() : request.getHeader("X-USER-EMAIL");
        String role = (auth != null && !auth.getAuthorities().isEmpty()) ?
                auth.getAuthorities().iterator().next().getAuthority() : request.getHeader("X-USER-ROLE");
        String userIdHeader = request.getHeader("X-USER-ID");
        Long userId = userIdHeader != null ? Long.valueOf(userIdHeader) : null;
        return new CurrentUser(email, role, userId);
    }

}