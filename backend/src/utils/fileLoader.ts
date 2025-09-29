import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export default function fileLoader(filePath: string): any {
  console.log(`filePath: ${filePath}`);
  const __filename = fileURLToPath(import.meta.url);
  console.log( `__filename: ${__filename}`);
  const __dirname = path.dirname(__filename);
  console.log(`dirname:${__dirname}`);
  // resolve baseado na raiz do backend
  const resolvedPath = path.resolve(__dirname, "../", filePath);
  console.log( `resolved: ${resolvedPath}`);
  const raw = fs.readFileSync(resolvedPath, "utf-8");
  return JSON.parse(raw);
}
