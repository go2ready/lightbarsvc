import { NotificationHelper } from '../NotificationHelper';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { NotificationActions } from '../../../reducers/NotificationActionReducer';
import { setShouldShow } from '../../../actions/NotificationActions';
import { NotificationType } from '../../../types/NotificationStoreState';
import { RootState } from '../../../types/Index'

export function mapStateToProps(state: RootState) {
  const { notification: { message, shouldShow, actionId, autoHideTimer, type }} = state;
  return {
    message,
    shouldShow,
    actionId,
    autoHideTimer,
    type,
  }
}

export function mapDispatchToProps(dispatch: Dispatch<NotificationActions>) {
  return {
    setShouldShow: (shouldShow: boolean, message: string, autoHideTimer?: number, type?: NotificationType) => 
      dispatch(setShouldShow(shouldShow, message, autoHideTimer, type))
  }
}

export const NotificationHelperContainer = 
connect(mapStateToProps, mapDispatchToProps)(NotificationHelper);
