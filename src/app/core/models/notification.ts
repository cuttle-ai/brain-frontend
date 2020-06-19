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
   * message by the notification
   */
  message: string;
}
