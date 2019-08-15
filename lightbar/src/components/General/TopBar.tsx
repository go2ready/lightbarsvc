import * as React from 'react';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, WithStyles, createStyles  } from '@material-ui/core/styles';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import IconButton from '@material-ui/core/IconButton';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';

function ElevationScroll(props : ElevationScroll) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

interface ElevationScroll {
  children: React.ReactElement,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Node | Window | undefined,
};

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    zIndex: 1024,
  },
  toolbarButtons: {
    marginLeft: "auto",
    marginRight: -12
  },
});

export interface ITopBarProps extends WithStyles<typeof styles> {
}

export interface ITopBarState {
  showConfirmationBox: boolean;
}

export const TopBar = withStyles(styles)(
  class extends React.Component<ITopBarProps, ITopBarState>{
    constructor(props : ITopBarProps) {
      super(props);

      this.state = {
        showConfirmationBox: false,
      };
    }

    public render() : JSX.Element {
      const { classes } = this.props;
      const { showConfirmationBox } = this.state;

      return (
        <div className={classes.root}>
          <AppBar position="fixed" color="default">
            <Toolbar variant="dense">
              <Typography variant="h6" color="inherit">
                Coralution Saber
              </Typography>
 
              <span className={classes.toolbarButtons}>
                <IconButton aria-label="to the top" color="inherit">
                  <VerticalAlignTopIcon />
                </IconButton>
              </span>
            </Toolbar>
          </AppBar>
          
          <Dialog
            open={showConfirmationBox}
            onClose={this.OnImportHelpDismissed}
            aria-labelledby="help-alert-dialog-title"
            aria-describedby="help-alert-dialog-description"
          >
            <DialogTitle id="help-alert-dialog-title">{"Shipping from outside the country"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="help-alert-dialog-description">
                Your light with custom designed spectrum will be specially made for you in our factory, 
                brefore deliverying to you via express shipping directly to your door 
                FREE of charge (if you live in remote areas that UPS/USPS/DHL/FEDEX/DPD doesn't cover, please contact us first).
                {<br/>}{<br/>}
                However there might be custom duty or import tax which we will not be responsible for, should such charge occurs, they 
                are normally collected by the shipping company or when you pick it up, please do not confuse them for additional shipping charge.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.OnImportHelpDismissed} color="secondary">
                Okay
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  }
)