import * as React from 'react';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, WithStyles, createStyles  } from '@material-ui/core/styles';

import { LightBarStyle } from '../../../types/FlowState';

import SwipeableViews from 'react-swipeable-views';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const styles = (theme: Theme) => createStyles({
  root: {
  },
  swipe: {
    axis: theme.direction === 'rtl' ? 'x-reverse' : 'x'
  },
  dir: {
    dir: theme.direction
  },
});

export interface ITabPanelProps extends WithStyles<typeof styles> {
  children: React.ReactNode;
  index: number;
  value: number;
}

export const TabPanel = withStyles(styles)(
  class extends React.Component<ITabPanelProps>{
    public render() : JSX.Element {
      const { children, value, index } = this.props;

      return (
        <Typography
          component="div"
          role="tabpanel"
          hidden={value !== index}
          id={`action-tabpanel-${index}`}
          aria-labelledby={`action-tab-${index}`}
          className={this.props.classes.dir}
        >
          <Box p={3}>{children}</Box>
        </Typography>
      );
    }
  }
)

export interface IStepSizeProps extends WithStyles<typeof styles> {
  lightBarStyle? : LightBarStyle;

  setLightBarStyle?: (lightBarStyle: LightBarStyle) => void;
  setDiodeSequence?: (diodeSequence: string[]) => void;
}

export const SizeStep = withStyles(styles)(
  class extends React.Component<IStepSizeProps>{

    constructor(props : IStepSizeProps) {
      super(props);

      this.HandleChange = this.HandleChange.bind(this);
      this.HandleIndexChange = this.HandleIndexChange.bind(this);
    }

    public render() : JSX.Element {
      const { classes } = this.props;

      var self = this;

      var value = 0;
      var lightBarStyle = this.props.lightBarStyle;
      if (lightBarStyle === LightBarStyle.Sixty)
      {
        value = 0;
      } else if (lightBarStyle === LightBarStyle.Ninety)
      {
        value = 1;
      } else if (lightBarStyle === LightBarStyle.OneTwety)
      {
        value = 2;
      }

      return (
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={self.HandleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="action tabs example"
            >
              <Tab label="Saber 600" {...self.a11yProps(0)} />
              <Tab label="Saber 900" {...self.a11yProps(1)} />
              <Tab label="Saber 1200" {...self.a11yProps(2)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            className={classes.swipe}
            index={value}
            onChangeIndex={self.HandleIndexChange}
          >
            <TabPanel value={value} index={0}>
              Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
          </SwipeableViews>
        </div>
      );
    }

    private HandleChange(event: any, index: number) : void {
      this.ChangeSelection(index);
    }

    private HandleIndexChange(index: number) : void {
      this.ChangeSelection(index);
    }

    private ChangeSelection(index : number) : void
    {
      var style = LightBarStyle.Sixty;
      switch (index)
      {
        case 0:
          style = LightBarStyle.Sixty;
          break;
        case 1:
          style = LightBarStyle.Ninety;
          break;
        case 2:
          style = LightBarStyle.OneTwety;
          break;
        default:
          break;
      }

      if (typeof this.props.setLightBarStyle === 'function')
      {
        this.props.setLightBarStyle(style);
      } else {
        console.error('setLightBarStyle function not available');
      }

      if (typeof this.props.setDiodeSequence === 'function')
      {
        var number = this.getCellNumber(style);
        var diodes = [];
        for (var i = 0; i < number; i++)
        {
          diodes.push('N/A');
        }

        this.props.setDiodeSequence(diodes);
      } else {
        console.error('setLightBarStyle function not available');
      }
    }

    private getCellNumber(lightBarStyle: LightBarStyle) {
      switch(lightBarStyle)
      {
        case LightBarStyle.Sixty:
          return 18;
        case LightBarStyle.Ninety:
          return 24;
        case LightBarStyle.OneTwety:
          return 36;
        default:
          return 0;
      }
    }

    private a11yProps(index: number) {
      return {
        id: `action-tab-${index}`,
        'aria-controls': `action-tabpanel-${index}`,
      };
    }
  }
)