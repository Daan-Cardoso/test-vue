import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "./db.json");

const readTasks = () => {
  if (!fs.existsSync(dbPath)) return [];
  return JSON.parse(fs.readFileSync(dbPath, "utf8")).tasks;
};

const writeTasks = (tasks) => {
  fs.writeFileSync(dbPath, JSON.stringify({ tasks }, null, 2), "utf8");
};

export { readTasks, writeTasks };
