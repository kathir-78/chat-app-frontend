import { io } from "socket.io-client";

const createWebSocketConnection = ()=>{
    const socket = io('http://localhost:1313');
    return socket;
}

export default createWebSocketConnection;
