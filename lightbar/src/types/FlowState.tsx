export enum LightBarStyle {
  Sixty = 60,
  Ninety = 90,
  OneTwety = 120,
}

export interface IFlowState {
  flowStage: number,
  lightBarStyle: LightBarStyle,
  isCustomising: boolean,
  shouldResetSpectrum: boolean,
  shouldExpandDiodePicker: boolean,
}