# Product Service

Manages product data for the e-commerce platform. Supports product retrieval and initial database seeding. Fully tested with unit, integration, and E2E tests.

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Setup](#setup)  
- [Environment Variables](#environment-variables)  
- [Running the Service](#running-the-service)  
- [Testing](#testing)  
- [Seeding](#seeding)  
- [API Endpoints](#api-endpoints)  

---

## Features

- Retrieve products by ID  
- Seed initial product data  
- Fully tested (unit, integration, E2E)  
- In-memory MongoDB for tests  

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
cd product-service
npm install
```

---

## Environment Variables

```bash
PORT=3002
MONGO_URI=mongodb://localhost:27017/productdb
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

- Uses in-memory MongoDB  
- Coverage displayed after tests  

---

## Seeding

```ts
import { seedProducts } from "./seed/seed";

await seedProducts();
```

---

## API Endpoints

- GET /products/:id — Retrieve a product by ID
