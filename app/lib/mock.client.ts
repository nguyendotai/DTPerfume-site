export async function readMockClient<T>(fileName: string): Promise<T> {
  const res = await fetch(`/mock/${fileName}`);
  if (!res.ok) throw new Error("Cannot load mock file");
  return res.json();
}
