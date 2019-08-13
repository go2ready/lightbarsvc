import { createAction } from 'typesafe-actions'
import { IFlowState, LightBarStyle } from '../types/FlowState';

export const setFlowStage = createAction('flow/FLOW_STAGE', resolve => {
  return (flowStage : number) => resolve({ flowStage } as IFlowState);
});

export const setLightBarStyle = createAction('flow/SET_BAR_STYLE', resolve => {
  return (lightBarStyle : LightBarStyle) => resolve({ lightBarStyle } as IFlowState);
});

export const setIsCustomising = createAction('flow/SET_IS_CUSTOMISING', resolve => {
  return (isCustomising : boolean) => resolve({ isCustomising } as IFlowState);
});

export const setShouldResetSpectrum = createAction('flow/SET_SHOULD_RESET_SPECTRUM', resolve => {
  return (shouldResetSpectrum : boolean) => resolve({ shouldResetSpectrum } as IFlowState);
});

export const setShouldExpandDiodePicker = createAction('flow/SET_SHOULD_EXPAND_DIODE', resolve => {
  return (shouldExpandDiodePicker : boolean) => resolve({ shouldExpandDiodePicker } as IFlowState);
});