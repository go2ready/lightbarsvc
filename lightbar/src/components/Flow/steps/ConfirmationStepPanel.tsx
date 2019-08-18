import * as React from 'react';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, WithStyles, createStyles  } from '@material-ui/core/styles';

import { LightBarStyle } from '../../../types/FlowState';

const styles = (theme: Theme) => createStyles({
  root: {
  },
});

export interface ISpectrumStepPanelProps extends WithStyles<typeof styles> {
  diodeSequence?: string[];
  lightBarStyle?: LightBarStyle;
  isCustomising?: boolean;
}

export interface ISpectrumStepPanelState {
  customExpaned: boolean;
}

export const SpectrumStepPanel = withStyles(styles)(
  class extends React.Component<ISpectrumStepPanelProps, ISpectrumStepPanelState>{

    constructor(props : ISpectrumStepPanelProps) {
      super(props);
    }


    public render() : JSX.Element {
      const { classes } = this.props;

      return (
        <div className={classes.root}>
        </div>
      );
    }
  }
)