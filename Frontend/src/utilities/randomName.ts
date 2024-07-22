import { customAlphabet } from "nanoid";

export function generateRandomName(logn: number) {
  const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", logn);
  return nanoid(logn);
}
