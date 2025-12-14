package com.auth_service_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * Main application class for the Authentication Service API.
 * 
 * <p>This is a Spring Boot microservice that provides:
 * <ul>
 *   <li>User registration and authentication</li>
 *   <li>JWT token generation</li>
 *   <li>User management operations</li>
 * </ul>
 * 
 * <p>The service is configured as a discovery client, allowing it to register
 * with service discovery mechanisms (e.g., Eureka, Consul) in a microservices architecture.
 * 
 * <p>Key features:
 * <ul>
 *   <li>Spring Boot auto-configuration</li>
 *   <li>Service discovery integration</li>
 *   <li>JWT-based authentication</li>
 *   <li>Role-based access control</li>
 * </ul>
 * 
 */
@SpringBootApplication
@EnableDiscoveryClient
public class AuthServiceApiApplication {
	public static void main(String[] args) {
		SpringApplication.run(AuthServiceApiApplication.class, args);
	}
}