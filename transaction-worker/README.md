# Transaction Worker

Consumes payment transactions from RabbitMQ and saves them to the Transaction MongoDB database. Designed to run as a background worker.

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Setup](#setup)  
- [Environment Variables](#environment-variables)  
- [Running the Worker](#running-the-worker)  
- [Testing](#testing)  

---

## Features

- Consume messages from RabbitMQ  
- Persist transactions in MongoDB  
- Fully tested with Jest  
- Uses in-memory MongoDB for tests  

---

## Tech Stack

- Node.js  
- MongoDB & Mongoose  
- RabbitMQ (amqplib)  
- TypeScript  
- Jest  

---

## Setup

```bash
git clone <repo-url>
cd transaction-worker
npm install
```

---

## Environment Variables

```bash
MONGO_URI=mongodb://localhost:27017/transactiondb
RABBITMQ_URI=amqp://localhost
NODE_ENV=development
```

---

## Running the Worker

```bash
npm run start
```

- Connects to MongoDB  
- Connects to RabbitMQ  
- Listens for transaction messages  

---

## Testing

```bash
npm run test
```

- Unit tests for transaction handling  
- Mocks RabbitMQ connections  
- Uses in-memory MongoDB for database tests  
