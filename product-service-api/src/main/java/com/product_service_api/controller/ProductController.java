package com.product_service_api.controller;

import java.util.List;

import com.product_service_api.model.CurrentUser;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.product_service_api.entity.Product;
import com.product_service_api.service.ProductService;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
@Slf4j
public class ProductController {

    private final ProductService productService;

    @GetMapping
    @PreAuthorize("hasAuthority('CLIENT')")
    public ResponseEntity<?> findAllProducts() {
        try {
            return new ResponseEntity<>(productService.findAllProducts(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update/stock/{idProduct}")
    @PreAuthorize("hasAuthority('CLIENT')")
    public ResponseEntity<?> updateStockProduct(@PathVariable("idProduct") Long idProduct, @RequestBody Integer Stock) {
        try {
            return new ResponseEntity<>(productService.updateStockProduct(idProduct, Stock), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/save")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> saveProduct(@RequestBody Product product) {
        try {
            return new ResponseEntity<>(productService.saveProduct(product), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/save/list")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> saveListProducts(@RequestBody List<Product> products) {
        try {
            return new ResponseEntity<>(productService.saveListProducts(products), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{idProduct}")
//    @PreAuthorize("hasAuthority('CLIENT')")
    public ResponseEntity<?> findProductById(HttpServletRequest request, @PathVariable("idProduct") Long idProduct) {
        log.info("request {}", request);
        try {
            return new ResponseEntity<>(productService.findProductById(idProduct), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error", HttpStatus.NOT_FOUND);
        }
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