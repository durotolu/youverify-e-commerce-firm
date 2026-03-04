import mongoose from "mongoose";
import { connectDB } from "./db";

jest.mock("mongoose", () => ({
  connect: jest.fn(),
}));

describe("connectDB", () => {
  it("should connect successfully", async () => {
    (mongoose.connect as jest.Mock).mockResolvedValueOnce(true);
    await expect(connectDB()).resolves.not.toThrow();
  });

  it("should throw error on connection failure", async () => {
    (mongoose.connect as jest.Mock).mockRejectedValueOnce(new Error("fail"));

    await expect(connectDB()).rejects.toThrow("fail");
  });
});
