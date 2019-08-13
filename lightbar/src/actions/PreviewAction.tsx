import { createAction } from 'typesafe-actions'
import { IPreviewState } from '../types/PreviewState';

export const setDiodeSequence = createAction('flow/DIODE_SEQUENCE', resolve => {
  return (diodeSequence : string[]) => resolve({ diodeSequence } as IPreviewState);
});

export const setCurrSelection = createAction('flow/CURR_SELECTION', resolve => {
  return (currSelection : number) => resolve({ currSelection } as IPreviewState);
});