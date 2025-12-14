package com.payment_service_api.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
public class Payment {
    @Id
    @GeneratedValue
    private Long id;
    private Long orderId;
    Double total;
    String currency;
    String method;
    String description;
    String status;
}