import { combineReducers } from 'redux';

import { NotificationActionReducer } from './NotificationActionReducer';
import { FlowActionReducer } from './FlowActionReducer';
import { PreviewActionReducer } from './PreviewActionReducer';

export const rootReducer = combineReducers({
  flow: FlowActionReducer,
  preview: PreviewActionReducer,
  notification: NotificationActionReducer,
});