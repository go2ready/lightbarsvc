import * as React from 'react';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, WithStyles, createStyles  } from '@material-ui/core/styles';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

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

export const TopBar = withStyles(styles)(
  class extends React.Component<ITopBarProps>{
    constructor(props : ITopBarProps) {
      super(props);
    }

    public render() : JSX.Element {
      const { classes } = this.props;

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
        </div>
      );
    }
  }
)