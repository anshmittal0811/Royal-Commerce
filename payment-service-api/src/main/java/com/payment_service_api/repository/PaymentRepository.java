package com.payment_service_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.payment_service_api.entity.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
}