import { Injectable } from "@angular/core";
import * as io from "socket.io-client";

/**
 * ConfigService has the configuration utilities required for the application
 */
@Injectable({
  providedIn: "root",
})
export class WebSocketsService {
  socket;
  constructor() {}
  setupSocketConnection() {
    this.socket = io("/", { path: "/cuttle-websockets" });
    console.log(this.socket);
  }
}
