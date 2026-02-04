import { createClient } from "redis";

export const pubClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

export const subClient = pubClient.duplicate();

export async function connectRedis() {
  await pubClient.connect();
  await subClient.connect();
  console.log("Redis connected");
}