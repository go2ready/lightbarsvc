import { Footer } from '../Footer';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { RootAction } from '../../../types/Index';
import { RootState } from '../../../types/Index'

export function mapStateToProps(state: RootState) {
  const { flow: { flowStage } } = state;
  return {
    flowStage
  }
}

export function mapDispatchToProps(dispatch: Dispatch<RootAction>) {
  return {
  }
}

export const FooterContainer =  connect(mapStateToProps, mapDispatchToProps)(Footer);
