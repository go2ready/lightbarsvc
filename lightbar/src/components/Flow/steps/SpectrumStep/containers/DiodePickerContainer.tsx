import { DiodePicker } from '../DiodePicker';
import { RootState } from '../../../../../types/Index';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { RootAction } from '../../../../../types/Index';
import { setDiodeSequence } from '../../../../../actions/PreviewAction';

export function mapStateToProps(state: RootState) {
    const { preview: { diodeSequence, currSelection } } = state;
    return {
      diodeSequence,
      currSelection,
    }
  }

export function mapDispatchToProps(dispatch: Dispatch<RootAction>) {
  return {
    setDiodeSequence: (diodeSequence: string[]) => dispatch(setDiodeSequence(diodeSequence)),
  }
}

export const DiodePickerContainer = connect(mapStateToProps, mapDispatchToProps)(DiodePicker);
