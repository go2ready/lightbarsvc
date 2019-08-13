import { PreviewPanel } from '../PreviewPanel';
import { RootState } from '../../../types/Index';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { PreviewAction } from '../../../reducers/PreviewActionReducer';

export function mapStateToProps(state: RootState) {
  const { flow:{ lightBarStyle } } = state;
    return {
      lightBarStyle
    }
  }

export function mapDispatchToProps(dispatch: Dispatch<PreviewAction>) {
  return {
  }
}

export const PreviewPanelContainer = connect(mapStateToProps, mapDispatchToProps)(PreviewPanel);
