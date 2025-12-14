package com.shopping_service_api.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import com.shopping_service_api.dto.ProductResponse;

@FeignClient(name = "product-service-api")
public interface ProductServiceClient {

    @GetMapping("/product/{idProduct}")
    ProductResponse findProductById(@PathVariable("idProduct") Long idProduct);

    @PutMapping("/product/update/stock/{idProduct}")
    ProductResponse updateStockProduct(@PathVariable("idProduct") Long idProduct, @RequestBody Integer sale);

}