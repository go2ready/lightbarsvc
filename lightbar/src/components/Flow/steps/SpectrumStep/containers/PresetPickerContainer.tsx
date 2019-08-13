import { PresetPicker } from '../PresetPicker';
import { RootState } from '../../../../../types/Index';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { RootAction } from '../../../../../types/Index';
import { setDiodeSequence } from '../../../../../actions/PreviewAction';
import { setShouldResetSpectrum } from '../../../../../actions/FlowAction';

export function mapStateToProps(state: RootState) {
    const { flow: { lightBarStyle, shouldResetSpectrum } } = state;
    return {
      lightBarStyle,
      shouldResetSpectrum
    }
  }

export function mapDispatchToProps(dispatch: Dispatch<RootAction>) {
  return {
    setDiodeSequence: (diodeSequence: string[]) => dispatch(setDiodeSequence(diodeSequence)),
    setShouldResetSpectrum: (shouldResetSpectrum: boolean) => dispatch(setShouldResetSpectrum(shouldResetSpectrum)),
  }
}

export const PresetPickerContainer = connect(mapStateToProps, mapDispatchToProps)(PresetPicker);
