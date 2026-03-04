# youverify-e-commerce-firm

YouVerify E-Commerce Firm is a **microservices-based e-commerce platform**. It consists of multiple services handling customers, products, orders, payments, and transaction processing. Each service is independently deployable and tested.

---

## Architecture Diagram

       +-----------------+
       | Customer Service|
       |   (Port 3001)   |
       +--------+--------+
                |
                v
       +-----------------+
       |  Order Service  |
       |   (Port 3003)   |
       +--------+--------+
                |
                v
       +-----------------+
       | Payment Service |
       |   (Port 3004)   |
       +--------+--------+
                |
                v
            RabbitMQ
                |
                v
       +-----------------+
       | Transaction     |
       | Worker          |
       +-----------------+
                ^
                |
       +-----------------+
       | Product Service |
       |   (Port 3002)   |
       +-----------------+

**Notes:**

- Customer Service → Order Service via REST API  
- Order Service → Payment Service via REST API  
- Payment Service → Transaction Worker via RabbitMQ (asynchronous)  
- Product Service provides product data to orders and payments  
- Each service uses its **own MongoDB database** for isolation  
- Services are independently deployable and tested  

---

## Services

| Service | Port | Description |
|---------|------|-------------|
| Customer Service | 3001 | CRUD operations for customers, database seeding |
| Product Service  | 3002 | CRUD operations for products, database seeding |
| Order Service    | 3003 | Order creation and management |
| Payment Service  | 3004 | Processes payments, publishes transaction events |
| Transaction Worker | N/A | Consumes transactions from RabbitMQ and persists them |

---

## Setup

1. Clone the repository:

```bash
git clone <repo-url>
cd youverify-e-commerce-firm
```

Install dependencies for each service:

```bash
cd <service-folder>
npm install
```


3. Ensure **MongoDB** and **RabbitMQ** are running:

- MongoDB default ports: 27017 (main), 27018 (tests)  
- RabbitMQ default: `amqp://localhost`  

---
## Environment Variables

Each service uses the same root .env file. see `env.example`:

## Running the Services

Start all services once with Docker:

```bash
docker compose up --build
# or in detached mode:
# docker compose up --build -d
```

Stop the stack:

```bash
docker compose down
```


Start each service individually:

```bash
cd customer-service
npm run start

cd product-service
npm run start

cd order-service
npm run start

cd payment-service
npm run start

cd transaction-worker
npm run start
```

---

## Testing

All services use **Jest** and **in-memory MongoDB** for tests:

```bash
npm run test
```

Includes unit, integration, and E2E tests.

Coverage is displayed in the console.

Server start blocks are skipped during tests to avoid conflicts.

## Seeding

Some services (Customer and Product) include initial data seeding:

```bash
import { seedCustomer } from "./seed/seed";
import { seedProducts } from "./seed/seed";

await seedCustomer();
await seedProducts();
```


Seeding runs automatically when services start in non-test mode.

---

## API Overview

### Customer Service

- `GET /customers/:id` — Retrieve a customer by ID  
- `POST /customers` — Create a new customer  

### Product Service

- `GET /products/:id` — Retrieve a product by ID  
- `POST /products` — Create a new product  

### Order Service

- `GET /orders/:id` — Retrieve an order by ID  
- `POST /orders` — Create a new order  

### Payment Service

- `POST /payments` — Process a payment  

### Transaction Worker

- Consumes messages from RabbitMQ `transactions` queue and stores them in the database  

---

## Notes

- Each service is **independently deployable**  
- Uses **MongoDB** for persistence  
- RabbitMQ is used for **asynchronous communication** between Payment Service and Transaction Worker  
- Fully tested with unit, integration, and E2E tests
