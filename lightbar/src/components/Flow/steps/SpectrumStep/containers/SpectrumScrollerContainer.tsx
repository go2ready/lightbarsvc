import { SpectrumScroller } from '../SpectrumScroller';
import { RootState } from '../../../../../types/Index';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { RootAction } from '../../../../../types/Index';
import { setCurrSelection } from '../../../../../actions/PreviewAction';

export function mapStateToProps(state: RootState) {
    const { preview: { diodeSequence, currSelection } } = state;
    return {
      diodeSequence,
      currSelection,
    }
  }

export function mapDispatchToProps(dispatch: Dispatch<RootAction>) {
  return {
    setCurrSelection: (currSelection: number) => dispatch(setCurrSelection(currSelection)),
  }
}

export const SpectrumScrollerContainer = connect(mapStateToProps, mapDispatchToProps)(SpectrumScroller);
