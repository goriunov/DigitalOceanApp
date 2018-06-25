const ClusterWS = require('clusterws');
const express = require('express');

const clusterws = new ClusterWS({
  worker: Worker,
  port: 3000
});

function Worker() {
  const wss = this.wss;
  const server = this.server;

  const app = express();
  app.use(express.static('public'));

  server.on('request', app);

  wss.on('connection', (socket) => {
    console.log('New socket is connected');

    socket.send('greet', 'Hi frontend i am backend how are you');
    socket.on('echo', (message) => {
      socket.send('echo', message);
    });
    socket.on('greetBack', (message) => {
      console.log(message);
    });
  });
}
