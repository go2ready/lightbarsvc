import { TopBar } from '../TopBar';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { RootAction } from '../../../types/Index';
import { RootState } from '../../../types/Index'

export function mapStateToProps(state: RootState) {
  return {
  }
}

export function mapDispatchToProps(dispatch: Dispatch<RootAction>) {
  return {
  }
}

export const TopBarContainer =  connect(mapStateToProps, mapDispatchToProps)(TopBar);
