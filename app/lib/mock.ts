import { readMockServer } from "./mock.server";
import { readMockClient } from "./mock.client";

export async function readMock<T>(fileName: string): Promise<T> {
  if (typeof window === "undefined") {
    return readMockServer<T>(fileName);
  }
  return readMockClient<T>(fileName);
}
