import { SpectrumStepPanel } from '../SpectrumStepPanel';
import { RootState } from '../../../../types/Index';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { RootAction } from '../../../../types/Index';
import { setShouldExpandDiodePicker } from '../../../../actions/FlowAction';
import { setDiodeSequence } from '../../../../actions/PreviewAction';

export function mapStateToProps(state: RootState) {
    const { flow: { lightBarStyle, isCustomising, shouldExpandDiodePicker }, preview: { diodeSequence } } = state;
    return {
      diodeSequence,
      lightBarStyle,
      isCustomising,
      shouldExpandDiodePicker,
    }
  }

export function mapDispatchToProps(dispatch: Dispatch<RootAction>) {
  return {
    setDiodeSequence: (diodeSequence: string[]) => dispatch(setDiodeSequence(diodeSequence)),
    setShouldExpandDiodePicker: (shouldExpandDiodePicker: boolean) => dispatch(setShouldExpandDiodePicker(shouldExpandDiodePicker)),
  }
}

export const SpectrumStepPanelContainer = connect(mapStateToProps, mapDispatchToProps)(SpectrumStepPanel);
