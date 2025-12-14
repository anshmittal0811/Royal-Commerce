package com.product_service_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.product_service_api.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}