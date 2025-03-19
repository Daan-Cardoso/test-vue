import express from 'express';
import moment from "moment";
import { readTasks, writeTasks } from "./db.js";
import { broadcastTasks } from "./websocket.js";

const router = express.Router();
router.use(express.json());

router.get("/tasks", (req, res) => {
  res.json(readTasks());
});


router.get("/tasks/:id", (req, res) => {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id == Number(req.params.id));

  if (!task) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }

  res.json(task);
});

router.post("/tasks", (req, res) => {
  const tasks = readTasks();
  const newTask = {
    id: moment().valueOf(),
    text: req.body.text || `Tarefa automática - ${moment().format("HH:mm:ss")}`,
    created_at: moment().format("DD/MM/YYYY HH:mm:ss"),
    checked: false,
    finished_at: "",
  };

  tasks.push(newTask);
  writeTasks(tasks);

  broadcastTasks();

  console.log(newTask)

  res.json(newTask);
});

router.patch("/tasks/:id", (req, res) => {
  const tasks = readTasks();
  const taskIndex = tasks.findIndex((t) => t.id == Number(req.params.id));

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }

  tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
  writeTasks(tasks);
  broadcastTasks();

  res.status(201).json(tasks[taskIndex]);
});

router.patch("/tasks/statusUpdate/:id", (req, res) => {
  const tasks = readTasks();
  const taskIndex = tasks.findIndex((t) => t.id == Number(req.params.id));
  const isFinished = req.body.status;

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }

  tasks[taskIndex] = { ...tasks[taskIndex], checked: isFinished, finished_at: isFinished ? moment().format("DD/MM/YYYY HH:mm:ss") : "" };
  writeTasks(tasks);

  console.log(tasks[taskIndex])
  
  broadcastTasks();

  res.json(tasks[taskIndex]);
});

router.delete("/tasks/:id", (req, res) => {
  const tasks = readTasks();
  const filteredTasks = tasks.filter((t) => t.id !== Number(req.params.id));

  if (filteredTasks.length === tasks.length) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }

  writeTasks(filteredTasks);
  broadcastTasks();

  res.json({ message: "Tarefa excluída com sucesso" });
});

export default router;
