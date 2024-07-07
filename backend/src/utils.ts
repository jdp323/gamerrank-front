import { createHash, randomBytes } from "crypto";

export function sha256(content: string) {
  return createHash("sha256").update(content).digest("hex");
}

export function uid() {
  return randomBytes(4).toString("hex");
}
