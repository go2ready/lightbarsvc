import { SizeStep } from '../SizeStep';
import { RootState } from '../../../../types/Index';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { RootAction } from '../../../../types/Index';
import { setLightBarStyle } from '../../../../actions/FlowAction';
import { setDiodeSequence } from '../../../../actions/PreviewAction';
import { LightBarStyle } from '../../../../types/FlowState';

export function mapStateToProps(state: RootState) {
    const { flow: { lightBarStyle } } = state;
    return {
      lightBarStyle
    }
  }

export function mapDispatchToProps(dispatch: Dispatch<RootAction>) {
  return {
    setLightBarStyle: (lightBarStyle: LightBarStyle) => dispatch(setLightBarStyle(lightBarStyle)),
    setDiodeSequence: (diodeSequence: string[]) => dispatch(setDiodeSequence(diodeSequence)),
  }
}

export const SizeStepContainer = connect(mapStateToProps, mapDispatchToProps)(SizeStep);
