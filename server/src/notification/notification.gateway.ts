import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AlertType } from 'src/types/index.types';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3001',
    methods: ['GET'],
    credentials: true,
  },
})
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger(NotificationGateway.name);

  @WebSocketServer()
  server: Server;

  send(alerts: AlertType[]) {
    try {
      this.server.emit('alerts', alerts);
    } catch (error) {
      this.logger.error(`Error sending alerts: ${error.message}`);
    }
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
