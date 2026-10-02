import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DATA_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "data");

const RESOURCES = [
  "profile",
  "skills",
  "education",
  "experience",
  "portfolios",
  "certificates",
];

function assertResource(name) {
  if (!RESOURCES.includes(name)) {
    const error = new Error(`Unknown resource: ${name}`);
    error.status = 404;
    throw error;
  }
}

function filePath(name) {
  return path.join(DATA_DIR, `${name}.json`);
}

export function isResource(name) {
  return RESOURCES.includes(name);
}

export async function read(name) {
  assertResource(name);
  const raw = await readFile(filePath(name), "utf8");
  return JSON.parse(raw);
}

export async function write(name, data) {
  assertResource(name);
  await writeFile(filePath(name), `${JSON.stringify(data, null, 4)}\n`, "utf8");
  return data;
}

export function nextId(items) {
  const max = items.reduce((highest, item) => Math.max(highest, Number(item.id) || 0), 0);
  return max + 1;
}
