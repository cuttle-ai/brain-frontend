import _get from "lodash/get";

/**
 * Supported notification types
 */
export enum NotificationType {
  /**
   * InfoNotification is the notitfication for info type of notification
   */
  InfoNotification = "INFO_NOTIFICATION",
  /**
   * ErrorNotification is the notitfication for error type of notification
   */
  ErrorNotification = "ERROR_NOTIFICATION",
  /**
   * SuccessNotification is the notitfication for success type of notification
   */
  SuccessNotification = "SUCCESS_NOTIFICATION",
  /**
   * ActionNotification is the notitfication for action type of notification
   */
  ActionNotification = "ACTION_NOTIFICATION",
}

/**
 * FrontendNotificationType converts the external notification type to the one supported by frontend
 * @param ty is the type of external notification type
 */
export function FrontendNotificationType(ty: NotificationType): string {
  if (ty === NotificationType.InfoNotification) {
    return "info";
  }
  if (ty === NotificationType.ErrorNotification) {
    return "danger";
  }
  if (ty === NotificationType.SuccessNotification) {
    return "success";
  }
  if (ty === NotificationType.ActionNotification) {
    return "primary";
  }
}

/**
 * Notification should be implemented by a notification
 */
export interface Notification {
  /**
   * type of notification
   */
  type: string;
  /**
   * payload of the notification
   */
  payload: any;
}

/**
 * parseNotification will parse the notification
 * @param n notification to be parsed
 */
export function parseNotification(n: Notification): any {
  if (
    n.type === NotificationType.InfoNotification ||
    n.type === NotificationType.ErrorNotification ||
    n.type === NotificationType.SuccessNotification
  ) {
    return { type: FrontendNotificationType(n.type), message: n.payload };
  }
  if (n.type === NotificationType.ActionNotification) {
    return {
      type: FrontendNotificationType(n.type),
      message: _get(n, ["payload", "message"]),
      action: _get(n, ["payload", "action"]),
    };
  }
  return { type: "primary", message: n.payload };
}

/**
 * InfoNotification should be implemented by a info type notification
 */
export interface InfoNotification {
  /**
   * type of notification
   */
  type: string;
  /**
   * message by the notification
   */
  message: string;
}

export interface ActionNotification {
  /**
   * type of notification
   */
  type: string;
  /**
   * message by the notification
   */
  message: string;
  /**
   * action to be performed
   */
  action: string;
}
