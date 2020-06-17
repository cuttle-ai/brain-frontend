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
    this.socket = io("/", { path: "/cuttle-websockets" });
    this.socket.on("connect", function () {});
    this.socket.on("event", function (data) {});
    this.socket.on("disconnect", function () {});
  }
}
