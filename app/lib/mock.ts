import fs from "fs/promises";
import path from "path";

// app/lib/mock.ts
export async function readMock<T>(fileName: string): Promise<T> {
  const res = await fetch(`/mock/${fileName}`);
  if (!res.ok) {
    throw new Error("Cannot load mock file");
  }
  return res.json();
}
