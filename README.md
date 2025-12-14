# E-Commerce Microservices Platform

A production-ready e-commerce backend built with Java Spring Boot following microservices architecture. The system features service discovery, API gateway with JWT authentication, event-driven notifications, and is fully containerized with Docker.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Services](#services)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)

## Tech Stack

| Category | Technology |
|----------|------------|
| Language | Java 17+ |
| Framework | Spring Boot 3.2.5, Spring Cloud |
| Database | MySQL 8.x |
| Messaging | Apache Kafka |
| API Gateway | Spring Cloud Gateway |
| Service Discovery | Netflix Eureka |
| Inter-Service Communication | OpenFeign |
| Security | JWT Authentication |
| Documentation | Swagger / OpenAPI 3 |
| Containerization | Docker & Docker Compose |

## Architecture

The platform follows a microservices architecture with the following patterns:

- **Service Discovery**: All services register with Eureka for dynamic discovery
- **API Gateway**: Single entry point handling routing, authentication, and load balancing
- **Event-Driven**: Kafka enables asynchronous communication between Payment and Notification services
- **Feign Clients**: Declarative REST clients for synchronous inter-service communication

### Request Flow

1. Client sends request to **Gateway Service** (port 8090)
2. Gateway validates JWT token via `JwtAuthFilter`
3. Gateway discovers target service via **Eureka**
4. Request is routed to the appropriate microservice
5. Services communicate internally using **Feign clients**
6. Async events (e.g., payment completed) are published to **Kafka**

## Services

| Service | Port | Description |
|---------|------|-------------|
| **eureka-service-api** | 8761 | Service registry and discovery server |
| **gateway-service-api** | 8090 | API Gateway with JWT authentication and routing |
| **auth-service-api** | 8081 | User registration, login, and JWT token management |
| **shopping-service-api** | 8082 | Shopping cart operations (add, remove, view items) |
| **product-service-api** | 8083 | Product catalog management (CRUD operations) |
| **payment-service-api** | 8084 | Payment processing and order completion |
| **order-service-api** | 8085 | Order creation and lifecycle management |
| **notification-service-api** | 8086 | Email and SMS notifications via Kafka consumer |

### Service Details

#### Auth Service
- User registration with email validation
- User login with JWT token generation
- User profile management
- Role-based access control

#### Shopping Service
- Add/remove products to cart
- View cart contents
- Cart persistence per user
- Integrates with Product Service for product validation

#### Product Service
- Create, read, update, delete products
- Product inventory management
- Role-based access for admin operations

#### Order Service
- Create orders from shopping cart
- Order status management (PENDING, COMPLETED, CANCELLED)
- Order history retrieval
- Integrates with Shopping and User services

#### Payment Service
- Process payments for orders
- Update order status to COMPLETED
- Publish payment events to Kafka
- Integrates with Order Service via Feign

#### Notification Service
- Kafka consumer for payment events
- Email notification service
- SMS notification service

## Prerequisites

- **Docker** (v20.10+)
- **Docker Compose** (v2.0+)
- **Java 17+** (for local development)
- **Maven 3.8+** (for local development)

## Getting Started

### Using Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e_commerce
   ```

2. **Start all services**
   ```bash
   docker-compose up --build
   ```

3. **Verify services are running**
   - Eureka Dashboard: http://localhost:8761
   - Gateway Swagger UI: http://localhost:8090/swagger-ui.html

4. **Stop all services**
   ```bash
   docker-compose down
   ```

### Local Development

1. **Start infrastructure services**
   ```bash
   docker-compose up mysql kafka -d
   ```

2. **Run each service individually**
   ```bash
   cd <service-name>
   ./mvnw spring-boot:run
   ```

   Start services in this order:
   1. eureka-service-api
   2. gateway-service-api
   3. auth-service-api
   4. Other services (any order)

## API Endpoints

All APIs are accessible through the Gateway at `http://localhost:8090`

### Authentication (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |

### Users (Authenticated)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile` | Get current user profile |
| PUT | `/api/users/profile` | Update user profile |

### Products (Authenticated)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/product/` | List all products |
| GET | `/api/product/{id}` | Get product by ID |
| POST | `/api/product/` | Create product (Admin) |
| PUT | `/api/product/{id}` | Update product (Admin) |
| DELETE | `/api/product/{id}` | Delete product (Admin) |

### Shopping Cart (Authenticated)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/shopping/cart` | View cart |
| POST | `/api/shopping/cart/add` | Add item to cart |
| DELETE | `/api/shopping/cart/remove/{itemId}` | Remove item from cart |
| DELETE | `/api/shopping/cart/clear` | Clear cart |

### Orders (Authenticated)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders/` | Create order from cart |
| GET | `/api/orders/` | List user orders |
| GET | `/api/orders/{id}` | Get order details |

### Payments (Authenticated)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/payment/order/{orderId}` | View order for payment |
| POST | `/api/payment/pay/{orderId}` | Process payment |

### Authentication Header

Include the JWT token in all authenticated requests:
```
Authorization: Bearer <your-jwt-token>
```

## Configuration

### Environment Variables

Key environment variables used in `docker-compose.yml`:

| Variable | Service | Description |
|----------|---------|-------------|
| `MYSQL_ROOT_PASSWORD` | MySQL | Database root password |
| `MYSQL_DATABASE` | MySQL | Default database name |
| `JAVA_OPTS` | All services | JVM options |

### Application Configuration

Each service has its own `application.yml` in `src/main/resources/`:

- **Database**: MySQL connection at `mysql_docker:3306`
- **Eureka**: Service discovery at `eureka-service-api:8761`
- **Kafka**: Message broker at `kafka:9092`
- **JWT Secret**: Configured in gateway and auth services

### Ports Mapping

| Internal Port | External Port | Service |
|---------------|---------------|---------|
| 3306 | 3307 | MySQL |
| 8761 | 8761 | Eureka |
| 8090 | 8090 | Gateway |
| 8081 | 8081 | Auth |
| 8082 | 8082 | Shopping |
| 8083 | 8083 | Product |
| 8084 | 8084 | Payment |
| 8085 | 8085 | Order |
| 8086 | 8086 | Notification |
| 9092 | 9092 | Kafka |

## API Documentation

Swagger UI is available at: `http://localhost:8090/swagger-ui.html`

Individual service API docs:
- Auth Service: `/v3/api-docs/auth`
- Product Service: `/v3/api-docs/product`
- Shopping Service: `/v3/api-docs/shopping`
- Order Service: `/v3/api-docs/order`
- Payment Service: `/v3/api-docs/payment`
- Notification Service: `/v3/api-docs/notification`

## License

This project is licensed under the MIT License.

