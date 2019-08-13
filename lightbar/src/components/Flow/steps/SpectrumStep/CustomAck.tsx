import * as React from 'react';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, WithStyles, createStyles  } from '@material-ui/core/styles';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import { FormHelperText } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  root: {
  },
  button: {
    marginLeft: -10
  },
});

export interface ICustomAckProps extends WithStyles<typeof styles> {
  isCustomising?: boolean;

  setIsCustomising?: (isCustomising: boolean) => void;
  setShouldResetSpectrum?: (shouldResetSpectrum: boolean) => void;
  setShouldExpandDiodePicker?: (shouldExpandDiodePicker: boolean) => void;
}

export interface ICustomAckState {
  confirmOpen: boolean;
}

export const CustomAck = withStyles(styles)(
  class extends React.Component<ICustomAckProps, ICustomAckState>{

    constructor(props : ICustomAckProps) {
      super(props);

      this.state = {
        confirmOpen: false,
      }

      this.HandleCheckChange = this.HandleCheckChange.bind(this);
      this.HandleConfirmAccept = this.HandleConfirmAccept.bind(this);
      this.HandleConfirmedDecline = this.HandleConfirmedDecline.bind(this);
    }

    public render() : JSX.Element {
      const { classes, isCustomising } = this.props;
      const { confirmOpen } = this.state;

      var self = this;

      return (
        <div className={classes.root}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isCustomising}
                  onChange={self.HandleCheckChange}
                  value="isCustomising"
                  color="primary"
                />
              }
              label="I want to customise the spectrum and I understand that additional charge might occur *"
            />
          </FormGroup>
          <Dialog
            open={confirmOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Leaving customisation mode will reset your spectrum.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.HandleConfirmedDecline} color="secondary">
                No
              </Button>
              <Button onClick={this.HandleConfirmAccept} color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }

    private HandleConfirmedDecline()
    {
      this.setState({
        ...this.state,
        confirmOpen: false,
      });
    }

    private HandleConfirmAccept()
    {
      if (typeof this.props.setIsCustomising === 'function')
      {
        this.props.setIsCustomising(false);

        if (typeof this.props.setShouldResetSpectrum === 'function')
        {
          this.props.setShouldResetSpectrum(true);
        } else {
          console.error('setDiodeSequence function not available');
        }

      } else {
        console.error('setDiodeSequence function not available');
      }
      
      this.HandleConfirmedDecline();
    }

    private HandleCheckChange(event:React.ChangeEvent<HTMLInputElement>)
    {
      var isChecked = event.target.checked;
      if (this.props.isCustomising && !isChecked)
      {
        this.setState({
          ...this.state,
          confirmOpen: true
        });
        return;
      }

      if (typeof this.props.setIsCustomising === 'function')
      {
        this.props.setIsCustomising(isChecked);

        if (typeof this.props.setShouldExpandDiodePicker === 'function')
        {
          this.props.setShouldExpandDiodePicker(true);
        } else {
          console.error('setDiodeSequence function not available');
        }
      } else {
        console.error('setDiodeSequence function not available');
      }
    }
  }
)