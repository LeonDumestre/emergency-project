import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Socket } from "net";
import { Server } from "socket.io";

@WebSocketGateway()
export class AppGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    console.log(client);
    // Handle connection event
  }

  handleDisconnect(client: any) {
    console.log(client);
    // Handle disconnection event
  }

  @SubscribeMessage("message")
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(client);
    // Handle received message
    this.server.emit("message", data); // Broadcast the message to all connected clients
  }
}
