import { WebSocketServer } from "ws";
import { readTasks, writeTasks } from "./db.js";

const wss = new WebSocketServer({ noServer: true });

const broadcastTasks = () => {
  const tasks = readTasks();
  const tasksJson = JSON.stringify({ type: "tasks", data: tasks });

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(tasksJson);
    }
  });
};

wss.on("connection", (ws) => {
  console.log("📡 Novo cliente conectado");

  // Enviar tarefas atuais ao novo cliente
  ws.send(JSON.stringify({ type: "tasks", data: readTasks() }));

  ws.on("message", (message) => {
    try {
      const { type, data } = JSON.parse(message.toString());

      switch(type) {
        case "fetchTasks":
          // Enviar tarefas para o cliente
          const tasks = readTasks();
          ws.send(JSON.stringify({ type: "tasks", data: tasks, message: "Tarefas obtidas" }));
          break;

        case "deleteTask":
          // Excluir uma tarefa
          let tasksToDelete = readTasks().filter(task => task.id !== data.id);
          writeTasks(tasksToDelete);
          broadcastTasks();
          break;

        case "updateTask":
          // Atualizar uma tarefa existente
          let tasksToUpdate = readTasks().map(task =>
            task.id === data.id ? { ...task, ...data } : task
          );
          writeTasks(tasksToUpdate);
          broadcastTasks();
          break;

        default:
          console.log("❌ Tipo de mensagem não reconhecido:", type);
          break;
      }

    } catch (error) {
      console.error("❌ Erro ao processar mensagem:", error);
    }
  });

  ws.on("close", () => {
    console.log("🔌 Cliente desconectado");
  });
});

export { wss, broadcastTasks };
