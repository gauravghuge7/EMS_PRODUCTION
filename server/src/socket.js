import {app} from "./app.js"
import http from 'http';
import { Server } from 'socket.io';

// create a server using the http node module
const server = http.createServer(app);

const io = new Server(server, {
   cors: {
      origin: "*", // Allow requests from all origins
   }
});


// Handle new WebSocket connections
io.on('connection', (socket) => {

   console.log('A user connected:', socket.id);

   // Simulate a notification being sent from the server
   setInterval(() => {
      socket.emit('notification', { message: 'New notification from the server!', timestamp: new Date() });
   }, 10000); // Every 10 seconds, emit a new notification

   // Handle client disconnection
   socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
   });
});


export {
   server
}

