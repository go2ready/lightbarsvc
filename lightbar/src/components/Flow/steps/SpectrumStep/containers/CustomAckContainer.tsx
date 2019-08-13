import { CustomAck } from '../CustomAck';
import { RootState } from '../../../../../types/Index';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { RootAction } from '../../../../../types/Index';
import { setIsCustomising, setShouldResetSpectrum, setShouldExpandDiodePicker } from '../../../../../actions/FlowAction';

export function mapStateToProps(state: RootState) {
    const { flow: { isCustomising } } = state;
    return {
      isCustomising,
    }
  }

export function mapDispatchToProps(dispatch: Dispatch<RootAction>) {
  return {
    setIsCustomising: (isCustomising: boolean) => dispatch(setIsCustomising(isCustomising)),
    setShouldResetSpectrum: (shouldResetSpectrum: boolean) => dispatch(setShouldResetSpectrum(shouldResetSpectrum)),
    setShouldExpandDiodePicker: (shouldExpandDiodePicker: boolean) => dispatch(setShouldExpandDiodePicker(shouldExpandDiodePicker)),
  }
}

export const CustomAckContainer = connect(mapStateToProps, mapDispatchToProps)(CustomAck);
