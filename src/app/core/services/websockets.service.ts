import { Injectable, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";
import moment from "moment";

import {
  Notification,
  NotificationType,
  FrontendNotificationType,
} from "../models/notification";
import { time } from "console";

/**
 * ConfigService has the configuration utilities required for the application
 */
@Injectable({
  providedIn: "root",
})
export class WebSocketsService {
  /**
   * socket has the instance of the socket connection
   */
  private socket;
  /**
   * notificationEmit emits the notification information to the subscribers
   */
  private notificationEmit: EventEmitter<Notification> = new EventEmitter<
    Notification
  >();
  /**
   * time at which last notification was received;
   */
  private lastNotifcation: Date;
  constructor() {}
  /**
   * setupConnection setups the websocket connection with server
   */
  setupSocketConnection() {
    this.socket = io("", {
      path: "/cuttle-websockets",
      transports: ["websocket"],
    });
    this.socket.on("connect", function () {});
    this.socket.on(
      NotificationType.InfoNotification,
      this.notificationListener(NotificationType.InfoNotification)
    );
    this.socket.on(
      NotificationType.ErrorNotification,
      this.notificationListener(NotificationType.ErrorNotification)
    );
    this.socket.on(
      NotificationType.SuccessNotification,
      this.notificationListener(NotificationType.SuccessNotification)
    );
    this.socket.on("disconnect", function () {});
  }

  private notificationListener(ty: NotificationType): Function {
    this.lastNotifcation = new Date();
    return (data) => {
      this.notificationEmit.emit({
        type: FrontendNotificationType(ty),
        message: data,
      });
      setTimeout(() => {
        if (moment().subtract(6, "s").isBefore(this.lastNotifcation)) {
          return;
        }
        this.notificationEmit.emit(null);
      }, 7000);
    };
  }

  /**
   * notifications returns the observer to subscribe to the notification service
   */
  notifications(): Observable<Notification> {
    return Observable.create((observer) => {
      this.notificationEmit.subscribe((not: Notification) => {
        observer.next(not);
      });
    });
  }
}
