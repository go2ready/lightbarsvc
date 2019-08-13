import { ActionType, getType } from 'typesafe-actions'

import { INotificationStoreState } from '../types/NotificationStoreState';

import * as notificationActions from '../actions/NotificationActions'
export type NotificationActions = ActionType<typeof notificationActions>

export function NotificationActionReducer(state: INotificationStoreState | undefined, 
  action: NotificationActions) {
  if (state === undefined)
  {
    state = {
      message: '',
      actionId: '',
      shouldShow: false,
      autoHideTimer: 0, // 0 means never auto hide
      type: 'info',
    }
  }
  
  switch (action.type) {
    case getType(notificationActions.setMessage):
      return { ...state,
        message: action.payload.message
      };
    case getType(notificationActions.setActionId):
      return { ...state,
        actionId: action.payload.actionId
      };
    case getType(notificationActions.setShouldShow):
      return { ...state,
        shouldShow: action.payload.shouldShow,
        message: action.payload.message,
        autoHideTimer: action.payload.autoHideTimer,
        type: action.payload.type,
      };
    default:
      return state;
  }
}
