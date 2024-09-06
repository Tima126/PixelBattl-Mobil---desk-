const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public')); // Сервируем статические файлы из папки public

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        const parsedMessage = JSON.parse(message.toString());  // Преобразуем буфер в строку и разбираем JSON
        console.log('Received message:', parsedMessage);

        // Рассылаем сообщение всем подключенным клиентам
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(parsedMessage));  // Отправляем сообщение в формате JSON
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});


server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
