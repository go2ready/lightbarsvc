import React, { Component } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, WithStyles, createStyles  } from '@material-ui/core/styles';

import { CustomFlowContainer } from './components/Flow/containers/CustomFlowContainer'
import { PreviewPanelContainer } from './components/Preview/containers/PreviewPanelContainer'
import { NotificationHelperContainer } from './components/General/containers/NotificationHelperContainer';
import { FooterContainer } from './components/General/containers/FooterContainer';
import { TopBarContainer } from './components/General/containers/TopBarContainer';

const styles = (theme: Theme) => createStyles({
  root: {
    ...theme.mixins.gutters(),
    textAlign: 'center',
    flex: 1,
  },
  centerRoot: {
    ...theme.mixins.gutters(),
    textAlign: 'center',
    maxWidth: '500px',
  },
  shareIcon: {
    textAlign: 'center',
    display: 'inline',
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: 'white',
  },
});

export interface IAppProps extends WithStyles<typeof styles> {
}

export const App = withStyles(styles)(
  class App extends Component<IAppProps> {
    render() {
      const { classes } = this.props;
      return (
        <React.Fragment>
          <CssBaseline />
          <TopBarContainer />
          <div style={{ paddingTop: 64 }}>
          <PreviewPanelContainer />
            <div className={classes.root}>
              <div>
                <CustomFlowContainer />
              </div>
              <Divider variant="middle" />
              <FooterContainer />
              <NotificationHelperContainer />
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
);
