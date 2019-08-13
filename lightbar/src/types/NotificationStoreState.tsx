export type NotificationType = 'error' | 'info' | 'success' | 'warning';

export interface INotificationStoreState {
  readonly message?: string;
  readonly actionId?: string;
  readonly autoHideTimer?: number; // 0 means never
  readonly shouldShow?: boolean;
  readonly type?: NotificationType;
}