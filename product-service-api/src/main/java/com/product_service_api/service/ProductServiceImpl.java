package com.product_service_api.service;

import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.product_service_api.entity.Product;
import com.product_service_api.repository.ProductRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public List<Product> findAllProducts() {
        try {
            return productRepository.findAll();
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Product findProductById(Long idProduct) {
        log.info("Product {}", idProduct);
        return productRepository.findById(idProduct)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + idProduct));
    }

    @Override
    public Product saveProduct(Product product) {
        try {
            return productRepository.save(product);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<Product> saveListProducts(List<Product> products) {
        try {
            return productRepository.saveAll(products);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Product updateStockProduct(Long idProduct, Integer sale) {
        try {
            Product product = productRepository.findById(idProduct).get();
            Integer stock = product.getStock();
            product.setStock(stock-sale);
            return productRepository.save(product);
        } catch (Exception e) {
            return null;
        }
    }

}