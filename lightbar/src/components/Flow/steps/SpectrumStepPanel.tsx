import * as React from 'react';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, WithStyles, createStyles  } from '@material-ui/core/styles';

import { LightBarStyle } from '../../../types/FlowState';
import { Element } from 'react-scroll';

import { SpectrumScrollerContainer } from './SpectrumStep/containers/SpectrumScrollerContainer';
import { DiodePickerContainer } from './SpectrumStep/containers/DiodePickerContainer';
import { PresetPickerContainer } from './SpectrumStep/containers/PresetPickerContainer';
import { CustomAckContainer } from './SpectrumStep/containers/CustomAckContainer';
import { SpectrumGraphContainer } from '../../Charting/containers/SpectrumGraphContainer';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

import Grid from '@material-ui/core/Grid';

const styles = (theme: Theme) => createStyles({
  root: {
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }
});

export interface ISpectrumStepPanelProps extends WithStyles<typeof styles> {
  diodeSequence?: string[];
  lightBarStyle?: LightBarStyle;
  isCustomising?: boolean;
  shouldExpandDiodePicker?: boolean;

  setDiodeSequence?: (diodeSequence: string[]) => void;
  setShouldExpandDiodePicker?: (shouldExpandDiodePicker : boolean) => void;
}

export interface ISpectrumStepPanelState {
  customExpaned: boolean;
}

export const SpectrumStepPanel = withStyles(styles)(
  class extends React.Component<ISpectrumStepPanelProps, ISpectrumStepPanelState>{

    constructor(props : ISpectrumStepPanelProps) {
      super(props);

      this.state = {
        customExpaned: false
      }

      this.onExpandToggle = this.onExpandToggle.bind(this);
    }

    public componentDidUpdate()
    {
      this.onExpandRequest();
    }

    public render() : JSX.Element {
      const { classes } = this.props;

      console.log('customising:' + this.props.isCustomising);
      return (
        <div className={classes.root}>
          <CustomAckContainer />
          <Element name="CustomLEDDesign">
            <ExpansionPanel disabled={!this.props.isCustomising} expanded={this.state.customExpaned && this.props.isCustomising} onChange={this.onExpandToggle}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>Customise Your Own Spectrum</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div style={{width: '100%'}}>
                  <SpectrumScrollerContainer />
                  <DiodePickerContainer />
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Element>

          <Divider variant="middle" className={classes.divider}/>

          <Grid container spacing={3}>
            <Grid item xs>
              <PresetPickerContainer />
            </Grid>
            <Grid item xs>
              <SpectrumGraphContainer />
            </Grid>
          </Grid>
        </div>
      );
    }

    private onExpandRequest()
    {
      if (this.props.shouldExpandDiodePicker)
      {
        if (typeof this.props.setShouldExpandDiodePicker === 'function')
        {
          this.props.setShouldExpandDiodePicker(false);
        } else {
          console.error('setShouldExpandDiodePicker function not available');
        }

        this.setState({
          ...this.state,
          customExpaned: true,
        });
      }
    }

    private onExpandToggle(event: object, expanded: boolean)
    {
      this.setState({
        ...this.state,
        customExpaned: expanded
      });
    }
  }
)