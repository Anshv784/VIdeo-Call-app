import { WebSocketServer, WebSocket } from "ws";
import dotenv from "dotenv";
dotenv.config();
const port = Number(process.env.PORT) || 8080;
const wss = new WebSocketServer({ port });
let senderSocket = null;
let recieverSocket = null;
wss.on("connection", function connection(ws) {
    ws.on("error", function error(error) {
        console.error("Some error has come:" + error);
    });
    ws.on("message", function message(data) {
        const message = JSON.parse(data);
        if (message.type == 'identify-as-sender') {
            console.log("sender set");
            senderSocket = ws;
        }
        else if (message.type == 'identify-as-reciever') {
            console.log("reciever set");
            recieverSocket = ws;
        }
        else if (message.type == 'create-offer') {
            recieverSocket?.send(JSON.stringify({ type: "create-offer", sdp: message.sdp }));
            console.log("offer recieved");
        }
        else if (message.type == 'create-answer') {
            console.log("answer recieved");
            senderSocket?.send(JSON.stringify({ type: "create-answer", sdp: message.sdp }));
        }
        else if (message.type === 'ice-candidate') {
            if (ws === senderSocket) {
                recieverSocket?.send(JSON.stringify({ type: "ice-candidate", candidate: message.candidate }));
            }
            else if (ws === recieverSocket) {
                senderSocket?.send(JSON.stringify({ type: "ice-candidate", candidate: message.candidate }));
            }
        }
    });
});
//# sourceMappingURL=index.js.map