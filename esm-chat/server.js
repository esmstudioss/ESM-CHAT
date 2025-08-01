const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

// Statik dosyaları sun (index.html, js, css vb.)
app.use(express.static(__dirname));

// Socket.IO bağlantı yönetimi
io.on('connection', (socket) => {
  console.log('Yeni kullanıcı bağlandı:', socket.id);

  socket.on('chat message', (msg) => {
    // Mesajı tüm kullanıcılara gönder
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Kullanıcı ayrıldı:', socket.id);
  });
});

// Sunucu başlat (tüm IP’lerden bağlantıyı kabul eder)
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Socket.IO sunucusu ${PORT} portunda çalışıyor`);
});
