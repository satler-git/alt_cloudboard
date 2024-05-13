const express = require('express');
const socket = require('socket.io');
const http = require('http');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socket(server);
const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/pages/index.html');
});

app.get('/style.css', (req, res) => {
  fs.readFile('./static/style.css', 'UTF-8', function (err, data) {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.write(data);
    res.end();
  });
});

io.on('connection', (socket) => {
  console.log(`User connected`);
  io.emit(
    'load',
    {
      g1: [['1年用クラウドボードです', '3D 安部瑛斗', 'なし']],
      g2: [['2年用クラウドボードです', '3D 安部瑛斗', 'なし']],
      g3: [['3年用クラウドボードです', '3D 安部瑛斗', 'なし']],
    } /*<- SQLのデータを突っ込む*/
  );

  socket.on('getResponses', () => {
    io.emit(
      'load',
      {
        g1: [['1年用クラウドボードです', '3D 安部瑛斗', 'なし']],
        g2: [['2年用クラウドボードです', '3D 安部瑛斗', 'なし']],
        g3: [['3年用クラウドボードです', '3D 安部瑛斗', 'なし']],
      } /*<- SQLのデータを突っ込む*/
    );
  });

  socket.on('submit', (msg, user) => {
    console.log(`Received: ${msg},${user}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
