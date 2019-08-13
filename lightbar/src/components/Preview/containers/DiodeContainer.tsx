import { Diode } from '../Diode';
import { RootState } from '../../../types/Index';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { PreviewAction } from '../../../reducers/PreviewActionReducer';
import { setCurrSelection } from '../../../actions/PreviewAction';

export function mapStateToProps(state: RootState) {
  const { preview: { diodeSequence }, flow: { lightBarStyle, isCustomising }} = state;
    return {
      diodeSequence,
      lightBarStyle,
      isCustomising,
    }
  }

export function mapDispatchToProps(dispatch: Dispatch<PreviewAction>) {
  return {
    setCurrSelection: (currSelection: number) => dispatch(setCurrSelection(currSelection)),
  }
}

export const DiodeContainer = connect(mapStateToProps, mapDispatchToProps)(Diode);
