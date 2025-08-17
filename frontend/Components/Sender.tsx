import { useEffect , useState } from "react";

export const Sender = () => {
    const [socket,setSocket] = useState<null|WebSocket>(null);

    useEffect(() => {
       const socket = new WebSocket("ws://localhost:5001");
        socket.onopen = () => {
            setSocket(socket);
            socket.send(JSON.stringify({ type: "identify-as-sender" }));
        };
    }, []);

    async function sendVideo(){

        const pc = new RTCPeerConnection();
        const offer = await pc.createOffer();
        pc.setLocalDescription(offer);
        socket?.send(JSON.stringify({type : 'create-offer' , sdp: pc.localDescription}));

        if (socket) {
          socket.onmessage = (event: MessageEvent) => {
            const message = JSON.parse(event.data);
            if (message.type === "create-answer") {
              pc.setRemoteDescription(message.sdp);
            }
          };
        }
    }
    return (
        <>
        <h1>Sender</h1>
        <button onClick={sendVideo}>Send Video</button>
        </>
    );
};
