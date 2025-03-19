import express from "express";
import http from "http";
import { wss, broadcastTasks } from "./websocket.js";
import router from "./routes.js";
import { readTasks, writeTasks } from "./db.js";
import moment from "moment";
import cors from "cors";

const app = express();

const server = http.createServer(app);


app.use(express.json());
app.use(cors());
app.use(router);


server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

// setInterval(() => {
//   const tasks = readTasks();
//   const newTask = {
//     id: moment().valueOf(),
//     text: `Tarefa automática - ${moment().format("HH:mm:ss")}`,
//     created_at: moment().format("DD/MM/YYYY HH:mm:ss"),
//     checked: false,
//     finished_at: "",
//   };

//   tasks.push(newTask);
//   writeTasks(tasks);
//   console.log("✅ Nova tarefa adicionada:", newTask);
//   broadcastTasks();
// }, 50000);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
