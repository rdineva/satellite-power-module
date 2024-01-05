import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AlertType } from 'src/types/index.types';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET'],
    credentials: true,
  },
})
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  send(alerts: AlertType[]) {
    this.server.emit('alerts', alerts);
  }
}