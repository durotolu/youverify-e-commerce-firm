# Customer Service

This service handles customer management for the e-commerce platform. It provides REST APIs for creating, retrieving, and managing customers. It also includes database seeding and is fully tested.

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

- CRUD operations for customers  
- Database seeding  
- Fully tested (unit, integration, and E2E)  
- Uses in-memory MongoDB for testing  

---

## Tech Stack

- Node.js & Express  
- MongoDB & Mongoose  
- TypeScript  
- Jest & Supertest  
- dotenv  

---

## Setup

1. Clone the repository:

```bash
git clone <repo-url>
cd customer-service
```

2. Install dependencies:

```bash
npm install
```

3. Ensure MongoDB is running (default port: 27017, 27018 for tests).

## Environment Variables

Create a .env file in the project root:

```bash
PORT=3001
MONGO_URI=mongodb://localhost:27017/customerdb
NODE_ENV=development
```

## Running the Service

Start the server:

```bash
npm run start
```

The server will run on PORT (default 3001).

For development with hot reload:

```bash
npm run dev
```

## Testing

All tests use Jest with an in-memory MongoDB:

```bash
npm run test
```

- Includes unit, integration, and E2E tests.

- Coverage is displayed in the console.

- The server-starting block in index.ts is skipped during tests.

## Seeding

The service can seed initial customer data:

```bash
import { seedCustomer } from "./seed/seed";

await seedCustomer();
```

Seeding runs automatically when the service starts in non-test mode.

## API Endpoints

GET /customers/:id — Retrieve a customer by ID

POST /customers — Create a new customer

(Add more routes as needed)

All routes accept JSON input and return JSON output.
