import { io } from 'socket.io-client';
import { store } from './store/index';
import { addNotifications } from './store/notifications/actions';

let socket;

export const initiateWebSocket = () => {
  socket = io('http://localhost:3000');

  socket.on('alerts', (notifications) => {
    store.dispatch(addNotifications(notifications));
  });

  socket.on('connect', () => {
    console.log('WebSocket Connected');
  });

  socket.on('disconnect', () => {
    console.log('WebSocket Disconnected');
  });

  socket.on('connect_error', (error) => {
    console.error('Connection Error:', error);
  });
};

export const closeWebSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};
