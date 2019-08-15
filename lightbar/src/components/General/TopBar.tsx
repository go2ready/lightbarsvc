import * as React from 'react';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, WithStyles, createStyles  } from '@material-ui/core/styles';

import { animateScroll } from 'react-scroll';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import IconButton from '@material-ui/core/IconButton';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import HomeIcon from '@material-ui/icons/Home';

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

      this.OnScrollToTop = this.OnScrollToTop.bind(this);
      this.OnLeave = this.OnLeave.bind(this);
      this.OnNavigateAway = this.OnNavigateAway.bind(this);
      this.OnLeaveCancel = this.OnLeaveCancel.bind(this);
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
                <IconButton aria-label="go back to homepage" color="inherit" onClick={this.OnLeave}>
                  <HomeIcon />
                </IconButton>
                <IconButton aria-label="to the top" color="inherit" onClick={this.OnScrollToTop}>
                  <VerticalAlignTopIcon />
                </IconButton>
              </span>
            </Toolbar>
          </AppBar>
          
          <Dialog
            open={showConfirmationBox}
            onClose={this.OnLeaveCancel}
            aria-labelledby="help-alert-dialog-title"
            aria-describedby="help-alert-dialog-description"
          >
            <DialogTitle id="help-alert-dialog-title">Leaving your customisation</DialogTitle>
            <DialogContent>
              <DialogContentText id="help-alert-dialog-description">
                If you leave for the homepage, your current design will be lost, are you sure?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.OnNavigateAway} color="primary">
                Yes, take me back
              </Button>
              <Button onClick={this.OnLeaveCancel} color="secondary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }

    private OnScrollToTop()
    {
      animateScroll.scrollToTop({
        duration: 500,
        delay: 10,
        smooth: true,
        offset: 0,
      });
    }
    
    private OnLeave()
    {
      this.setState({
        ...this.state,
        showConfirmationBox: true
      });
    }

    private OnNavigateAway()
    {

    }

    private OnLeaveCancel()
    {
      this.setState({
        ...this.state,
        showConfirmationBox: false
      });
    }
  }
)