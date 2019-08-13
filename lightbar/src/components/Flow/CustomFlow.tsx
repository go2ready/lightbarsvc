import * as React from 'react';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, WithStyles, createStyles  } from '@material-ui/core/styles';

import { SizeStepContainer } from '../Flow/steps/containers/SizeStepContainer';
import { SpectrumStepPanelContainer } from '../Flow/steps/containers/SpectrumStepPanelContainer';

import { DiodeValidationHelper } from './helpers/DiodeValidationHelper';
import { LightBarStyle } from '../../types/FlowState';
import { NotificationType } from '../../types/NotificationStoreState';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

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
  canGoBack: boolean;
  canGoNext: boolean;
}

export const CustomFlow = withStyles(styles)(
  class extends React.Component<ICustomFlowProps, ICustomFlowState>{

    constructor(props : ICustomFlowProps) {
      super(props);

      this.state = {
        canGoBack: true,
        canGoNext: true,
      };

      this.handleReset = this.handleReset.bind(this);
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
      if (activeStep === 0)
      {
        this.StepZeroValidation();
      } else if (activeStep === 1)
      {
        if (!this.StepOneValidation())
        {
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
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                {<NavigateNextIcon />}
              </Button>
            </ButtonGroup>

            <Divider variant="middle" className={classes.divider} />

            {stepContent}
          </div>
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
      if (this.props.lightBarStyle && !this.state.canGoNext)
      {
        this.setState({
          ...this.state,
          canGoNext: true,
        });
      } 
      else if (!this.props.lightBarStyle && this.state.canGoNext)
      {
        this.setState({
          ...this.state,
          canGoNext: false,
        });
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
      }

      return true;
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