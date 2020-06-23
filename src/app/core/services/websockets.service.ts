import { Injectable, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";
import moment from "moment";

import {
  NotificationType,
  parseNotification,
  ActionNotification,
  InfoNotification,
} from "../models/notification";

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
   * infoNotificationEmit emits the info information to the subscribers
   */
  private infoNotificationEmit: EventEmitter<
    InfoNotification
  > = new EventEmitter<InfoNotification>();
  /**
   * actionNotificationEmit emits the action notification to the subscribers
   */
  private actionNotificationEmit: EventEmitter<
    ActionNotification
  > = new EventEmitter<ActionNotification>();
  /**
   * time at which last notification was received;
   */
  private lastNotifcation: Date;
  constructor() {}
  /**
   * setupConnection setups the websocket connection with server
   */
  setupSocketConnection() {
    setTimeout(this.initialization.bind(this), 5000);
  }

  private initialization() {
    this.socket = io("", {
      path: "/cuttle-websockets",
      transports: ["websocket"],
    });
    this.socket.on("connect", function () {});
    this.socket.on(
      NotificationType.InfoNotification,
      this.infoNotificationListener(NotificationType.InfoNotification)
    );
    this.socket.on(
      NotificationType.ErrorNotification,
      this.infoNotificationListener(NotificationType.ErrorNotification)
    );
    this.socket.on(
      NotificationType.SuccessNotification,
      this.infoNotificationListener(NotificationType.SuccessNotification)
    );
    this.socket.on(
      NotificationType.ActionNotification,
      this.actionNotificationListener(NotificationType.ActionNotification)
    );
    this.socket.on("disconnect", function () {});
  }

  /**
   * infoNotificationListener will listen for info type notification
   * @param ty type of the notification
   */
  private infoNotificationListener(ty: NotificationType): Function {
    this.lastNotifcation = new Date();
    return (data) => {
      this.infoNotificationEmitter(ty, data);
    };
  }

  private infoNotificationEmitter(ty: NotificationType, data: any) {
    this.infoNotificationEmit.emit(
      parseNotification({
        type: ty,
        payload: data,
      })
    );
    setTimeout(() => {
      // if (moment().subtract(6, "s").isBefore(this.lastNotifcation)) {
      //   return;
      // }
      this.infoNotificationEmit.emit(null);
    }, 7000);
  }

  /**
   * actionNotificationListener will listen for the action type  notification
   * @param ty type of notification
   */
  private actionNotificationListener(ty: NotificationType): Function {
    return (data) => {
      this.actionNotificationEmit.emit(
        parseNotification({
          type: ty,
          payload: data,
        })
      );
      this.infoNotificationEmitter(ty, data);
    };
  }

  /**
   * infoNotifications returns the observer to subscribe to the notification service
   */
  infoNotifications(): Observable<InfoNotification> {
    return Observable.create((observer) => {
      this.infoNotificationEmit.subscribe((not: InfoNotification) => {
        observer.next(not);
      });
    });
  }

  /**
   * actionNotifications returns the observer to subscribe to the action notification service
   */
  actionNotifications(): Observable<ActionNotification> {
    return Observable.create((observer) => {
      this.actionNotificationEmit.subscribe((not: ActionNotification) => {
        observer.next(not);
      });
    });
  }
}
