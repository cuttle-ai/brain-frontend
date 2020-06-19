import { Injectable } from "@angular/core";
import * as io from "socket.io-client";

/**
 * ConfigService has the configuration utilities required for the application
 */
@Injectable({
  providedIn: "root",
})
export class WebSocketsService {
  private socket;
  constructor() {}
  setupSocketConnection() {
    this.socket = io("", {
      path: "/cuttle-websockets",
      transports: ["websocket"],
    });
    this.socket.on("connect", function () {
      console.log("connected");
    });
    this.socket.on("INFO_NOTIFICATION", function (data) {
      console.log(data);
    });
    this.socket.on("disconnect", function () {
      console.log("disconnected");
    });
  }
}
