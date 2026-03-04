# Order Service

This service handles order management for the e-commerce platform. It provides REST APIs for creating and retrieving orders. It connects to MongoDB and communicates with other services as needed.

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

- Create and fetch orders  
- MongoDB integration  
- Fully tested (unit, integration, E2E)  
- In-memory MongoDB for testing  

---

## Tech Stack

- Node.js & Express  
- MongoDB & Mongoose  
- TypeScript  
- Jest & Supertest  
- dotenv  

---

## Setup

```bash
git clone <repo-url>
cd order-service
npm install
```

---

## Environment Variables

```bash
PORT=3003
MONGO_URI=mongodb://localhost:27017/orderdb
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

- Runs unit, integration, and E2E tests  
- Uses in-memory MongoDB for testing  
- Test coverage is displayed  

---

## API Endpoints

- GET /orders/:id — Retrieve an order by ID  
- POST /orders — Create a new order  
