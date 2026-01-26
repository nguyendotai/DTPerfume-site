// lib/mock.server.ts
import fs from "fs/promises";
import path from "path";

export async function readMockServer<T>(fileName: string): Promise<T> {
  const filePath = path.join(
    process.cwd(),
    "public",
    "mock",
    fileName
  );
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}
