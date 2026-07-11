import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const msg = message.toString();
        if (msg === "パソコンを自動化させたい") {
            ws.send("自動化ツールやスクリプト言語（Python, PowerShellなど）を使用してパソコンを自動化できます。具体的なタスクについて教えていただけますか？");
        } else {
            ws.send(`Received: ${message}`);
        }
    });

    ws.send('Welcome to the WebSocket chat!');
});

console.log('WebSocket server is running on port 8080');