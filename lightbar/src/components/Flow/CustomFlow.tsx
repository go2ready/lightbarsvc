import * as React from 'react';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, WithStyles, createStyles  } from '@material-ui/core/styles';

import { SizeStepContainer } from '../Flow/steps/containers/SizeStepContainer';
import { SpectrumStepPanelContainer } from '../Flow/steps/containers/SpectrumStepPanelContainer';

import { DiodeValidationHelper } from './helpers/DiodeValidationHelper';
import { LightBarStyle } from '../../types/FlowState';
import { NotificationType } from '../../types/NotificationStoreState';
import { WebSettingProvider } from '../../helpers/WebSettingProvider';
import { BuyUrlHelper } from './helpers/BuyUrlHelper';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Divider from '@material-ui/core/Divider';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = (theme: Theme) => createStyles({
  root: {
    textAlign: 'center',
    width: '100%',
  },
  stepper: {
    textAlign: 'center'
  },
  button: {
    marginRight: theme.spacing(1),
    minWidth: 150,
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }
});

export interface ICustomFlowProps extends WithStyles<typeof styles> {
  flowStage?: number;
  diodeSequence?: string[];
  lightBarStyle?: LightBarStyle;

  setFlowStage?: (flowStage: number) => void;
  setShouldShow: (shouldShow: boolean, message: string, autoHideTimer?: number, type?: NotificationType) => void;
}

export interface ICustomFlowState {
  showPresetDialog: boolean;
  presetValue: string;
}

export const CustomFlow = withStyles(styles)(
  class extends React.Component<ICustomFlowProps, ICustomFlowState>{

    constructor(props : ICustomFlowProps) {
      super(props);

      this.state = {
        showPresetDialog: false,
        presetValue: '',
      }

      this.handleReset = this.handleReset.bind(this);
      this.handleBack = this.handleBack.bind(this);
      this.handleNext = this.handleNext.bind(this);

      this.handleAddCustomRequest = this.handleAddCustomRequest.bind(this);
      this.handleAddPresetRequest = this.handleAddPresetRequest.bind(this);
      this.handlePresetDialogClose = this.handlePresetDialogClose.bind(this);
    }

    public handleAddPresetRequest(): void {
      if (this.props.lightBarStyle !== undefined && this.props.diodeSequence !== undefined)
      {
        var urlToGo = BuyUrlHelper.ConstructBuyUrl(this.props.lightBarStyle, false);
        if (urlToGo !== undefined)
        {
          window.location.replace(urlToGo);
        }
      }
    }

    public handleAddCustomRequest(): void {
      if (this.props.lightBarStyle !== undefined && this.props.diodeSequence !== undefined)
      {
        var urlToGo = BuyUrlHelper.ConstructBuyUrl(this.props.lightBarStyle, false, this.props.diodeSequence.join(''));
        if (urlToGo !== undefined)
        {
          window.location.replace(urlToGo);
        }
      }
    }

    public handlePresetDialogClose(): void {
      this.setState({
        ...this.state,
        showPresetDialog: false,
      });
    }

    public handleReset() : void {
      if (typeof this.props.setFlowStage === 'function')
      {
        this.props.setFlowStage(0);
      } else {
        console.error('setFlowStage function not available');
      }
    }

    public handleBack() : void {
      if (typeof this.props.setFlowStage === 'function' && this.props.flowStage !== undefined)
      {
        this.props.setFlowStage(this.props.flowStage - 1);
      } else {
        console.error('setFlowStage function or flow stage not available');
      }
    } 

    public handleNext() : void {
      var activeStep = this.GetCurrentStep();
      var totalSteps = this.getSteps();
      
      if (activeStep === 0)
      {
        // Step zero validation disable next button so no 
        this.StepZeroValidation();
      } else if (activeStep === 1)
      {
        if (!this.StepOneValidation())
        {
          return;
        }
      } else if (activeStep === (totalSteps.length - 1))
      {
        if (!this.finalStepValidation() || this.props.diodeSequence === undefined)
        {
          return;
        }

        // Final stage, check preset and navigate
        var preset = DiodeValidationHelper.IsPreset(this.props.diodeSequence)
        console.log(preset);
        if (preset === undefined)
        {
          // No preset match
          this.handleAddCustomRequest();

          // Do not advance
          return;
        }
        else
        {
          // Preset match, show dialog
          this.setState({
            showPresetDialog: true,
            presetValue: preset,
          });

          // Do not advance
          return;
        }
      } 

      if (typeof this.props.setFlowStage === 'function' && this.props.flowStage !== undefined)
      {
        this.props.setFlowStage(this.props.flowStage + 1);
      } else {
        console.error('setFlowStage function or flow stage not available');
      }
    } 

    public render() : JSX.Element {
      const { showPresetDialog, presetValue } = this.state;
      const { classes } = this.props;
      var self = this;

      var activeStep = this.GetCurrentStep();
      var steps = this.getSteps();
      var stepContent = this.GetCurrentStepContent();

      return (
        <div className={classes.root}>
          <Stepper className={classes.stepper} activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <div>
            <ButtonGroup color="primary" fullWidth aria-label="full width outlined button group">
              <Button disabled={activeStep === 0} onClick={() => self.handleBack()}>
              {<NavigateBeforeIcon />} Back
              </Button>
              <Button
                onClick={() => self.handleNext()}>
                <b>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </b>
                  {<NavigateNextIcon />}
              </Button>
            </ButtonGroup>

            <Divider variant="middle" className={classes.divider} />

            {stepContent}
          </div>

          <Dialog
            open={showPresetDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"The spectrum you chose matched our preset!"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Great minds thinks alike! The spectrum you chose is the same as <b>{presetValue}</b> that we have, we will just add that to your cart then, is that okay?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handlePresetDialogClose} color="secondary">
                No
              </Button>
              <Button onClick={this.handleAddPresetRequest} color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }

    private GetCurrentStep() : number {
      var activeStep = 0
      if (this.props.flowStage)
      {
        activeStep = this.props.flowStage;
      }

      return activeStep;
    }

    private GetCurrentStepContent() {
      var activeStep = this.GetCurrentStep();

      if (activeStep === 0)
      {
        return <SizeStepContainer />;
      } else if (activeStep === 1)
      {
        return <SpectrumStepPanelContainer />
      }
    }

    private StepZeroValidation() {
      if (this.props.lightBarStyle)
      {
        return true;
      } 
      else if (!this.props.lightBarStyle)
      {
        this.SetShouldShow(true, 'You must select a model', 5000, 'warning');
        return false;
      }
    }

    private StepOneValidation() {
      if (this.props.diodeSequence)
      {
        var invalidDiodes = DiodeValidationHelper.IsValid(this.props.diodeSequence);
        
        // Invalid
        if (invalidDiodes.length !== 0)
        {
          var message = 'LED not set: ';

          for (var _i = 1; _i <= invalidDiodes.length; _i++)
          {
            var endinging = '';
            if (_i !== invalidDiodes.length)
            {
              endinging = ', '
            }

            message += '#' + invalidDiodes[_i] + endinging
          }

          this.SetShouldShow(true, message, 5000, 'warning');

          return false;
        }
        else
        {
          // Only valid case
          return true;
        }
      }

      return false;
    }

    private finalStepValidation() {
      if (this.props.diodeSequence)
      {
        var invalidDiodes = DiodeValidationHelper.IsValid(this.props.diodeSequence);
        
        // Valid
        if (invalidDiodes.length === 0 && WebSettingProvider.isReturnURLValid())
        {
          return true;
        }
      }

      this.SetShouldShow(true, 'We are sorry seems that something went wrong on our end, please contact us or try again', 5000, 'error');

      return false;
    }

    private SetShouldShow(shouldShow: boolean, message: string, autoHideTimer?: number, type?: NotificationType)
    {
      if (typeof this.props.setShouldShow === 'function')
      {
        this.props.setShouldShow(shouldShow, message, autoHideTimer, type);
      } else {
        console.error('setFlowStage function or flow stage not available');
      }
    }

    private getSteps() {
      return ['Choose the size', 'Choose the spectrum', 'Confirmation'];
    }
  }
)