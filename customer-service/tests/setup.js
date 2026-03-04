"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearDatabase = exports.teardownTestDB = exports.setupTestDB = void 0;
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
let mongoServer;
const setupTestDB = async () => {
    if (mongoose_1.default.connection.readyState !== 0) {
        await mongoose_1.default.disconnect();
    }
    mongoServer = await mongodb_memory_server_1.MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    process.env.MONGO_URL = mongoUri;
    await mongoose_1.default.connect(mongoUri);
};
exports.setupTestDB = setupTestDB;
const teardownTestDB = async () => {
    await mongoose_1.default.disconnect();
    await mongoServer.stop();
};
exports.teardownTestDB = teardownTestDB;
const clearDatabase = async () => {
    const collections = mongoose_1.default.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
};
exports.clearDatabase = clearDatabase;
