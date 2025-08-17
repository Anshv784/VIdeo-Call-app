import { useEffect} from "react";

export const Reciever = () => {

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:5001");
        socket.onopen = () => {
            socket.send(JSON.stringify({ type: "identify-as-reciever" }));
        };
        socket.onmessage = async (event)=>{
            const message = JSON.parse(event.data);
            if(message.type=='create-offer'){
                const pc = new RTCPeerConnection();
                pc.setRemoteDescription(message.sdp);
                const answer = await pc.createAnswer();
                pc.setLocalDescription(answer);
                socket.send(JSON.stringify({type : "create-answer" , sdp : answer}))
            }
        }
    }, []);

    return (
        <h1>Reciever</h1>
    );
};
