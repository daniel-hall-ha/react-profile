import { createHash, randomInt, timingSafeEqual } from "node:crypto";

const OTP_TTL_MS = 60_000;

let current = null;

function hashOtp(code) {
  return createHash("sha256").update(code).digest("hex");
}

export function issueOtp(ttlMs = OTP_TTL_MS) {
  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  current = {
    hash: hashOtp(code),
    expiresAt: Date.now() + ttlMs,
  };
  return code;
}

export function verifyOtp(code) {
  const candidate = String(code || "").trim();
  if (!current || !/^\d{6}$/.test(candidate)) return false;
  if (Date.now() > current.expiresAt) {
    current = null;
    return false;
  }
  const incoming = Buffer.from(hashOtp(candidate), "hex");
  const stored = Buffer.from(current.hash, "hex");
  const matches = incoming.length === stored.length && timingSafeEqual(incoming, stored);
  current = null;
  return matches;
}

export function clearOtp() {
  current = null;
}
