import { ref, watch, onMounted, onUnmounted } from "vue";

export function useWebSocket(url: string) {
  const socket = ref<WebSocket | null>(null);
  const isConnected = ref(false);
  const messages = ref<any[]>([]);

  const connect = () => {
    if (socket.value) return;

    socket.value = new WebSocket(url);

    socket.value.addEventListener("open", () => {
      isConnected.value = true;
      console.log("WebSocket conectado");
    });

    socket.value.addEventListener("message", (event) => {
      try {
        const message = JSON.parse(event.data);
        messages.value.push(message);
      } catch (error) {
        console.error("Erro ao processar mensagem WebSocket:", error);
      }
    });

    socket.value.addEventListener("close", () => {
      isConnected.value = false;
      socket.value = null;
      console.log("WebSocket desconectado");
    });

    socket.value.addEventListener("error", (error) => {
      console.error("Erro no WebSocket:", error);
    });
  };

  const disconnect = () => {
    if (socket.value) {
      socket.value.close();
      socket.value = null;
    }
  };

  const sendMessage = (message: any) => {
    if (socket.value && isConnected.value) {
      socket.value.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket não está conectado. Mensagem não enviada.");
    }
  };

  onMounted(connect);
  onUnmounted(disconnect);

  return {
    isConnected,
    messages,
    sendMessage,
    connect,
    disconnect,
  };
}
