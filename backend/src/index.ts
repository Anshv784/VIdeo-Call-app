import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 5001 });

wss.on("connection", function (ws) {
  console.log("WebSocket server running on ws://localhost:5001");
  ws.on("error", function (error) {
    console.error("some error has come:", error);
  });

  ws.on("message", function (data) {
    const message = JSON.stringify(data);

    console.log(`${message}`);

  });
});
