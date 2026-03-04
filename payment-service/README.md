# Payment Service

Handles payment processing for the platform. Receives payment requests, publishes transactions to RabbitMQ, and connects to MongoDB for storage if needed.

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Setup](#setup)  
- [Environment Variables](#environment-variables)  
- [Running the Service](#running-the-service)  
- [Testing](#testing)  
- [API Endpoints](#api-endpoints)  

---

## Features

- Publish payment transactions to RabbitMQ  
- MongoDB integration for persistence  
- Fully tested with Jest & Supertest  
- In-memory MongoDB for tests  

---

## Tech Stack

- Node.js & Express  
- MongoDB & Mongoose  
- RabbitMQ (amqplib)  
- TypeScript  
- Jest & Supertest  
- dotenv  

---

## Setup

```bash
git clone <repo-url>
cd payment-service
npm install
```

---

## Environment Variables

```bash
PORT=3004
MONGO_URI=mongodb://localhost:27017/paymentdb
RABBITMQ_URI=amqp://localhost
NODE_ENV=development
```

---

## Running the Service

```bash
npm run start
npm run dev
```

---

## Testing

```bash
npm run test
```

- Unit, integration, and E2E tests  
- In-memory MongoDB for testing  
- RabbitMQ interactions mocked during tests  

---

## API Endpoints

- POST /payments — Process a payment  

Request body:

```json
{
  "customerId": "string",
  "orderId": "string",
  "productId": "string",
  "amount": "number"
}
```

Response:

```json
{
  "status": "Payment Processing (success)"
}
```
