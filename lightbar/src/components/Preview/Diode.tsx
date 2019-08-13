import * as React from 'react';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, WithStyles, createStyles  } from '@material-ui/core/styles';

import { scroller } from 'react-scroll';

import { DiodeColourHelper } from './helpers/DiodeColourHelper';
import { ColorMath } from '../../helpers/ColorMath';
import { LightBarStyle } from '../../types/FlowState';
import { PanelStyleHelper } from './helpers/PanelStyleHelper';

import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) => createStyles({
  root: {
  },
  diode: {
    float: "left",
    zIndex: 15,
  },
  svg: {
    position: 'relative',
    width: '100%',
    height: '100%',
    cursor: 'crosshair',
  },
  text: {
    cursor: 'crosshair',
    position: 'absolute',
    zIndex: 20,
  }
});

export interface IDiodeProps extends WithStyles<typeof styles> {
  index: number;
  diodeSequence?: string[];
  lightBarStyle?: LightBarStyle;
  isCustomising?: boolean;

  setCurrSelection?: (currSelection: number) => void;
}

export const Diode = withStyles(styles)(
  class extends React.Component<IDiodeProps>{
    constructor(props : IDiodeProps) {
      super(props);

      this.onClick = this.onClick.bind(this);
    }

    public render() : JSX.Element {
      const { classes, lightBarStyle } = this.props;

      var self = this;

      var name = this.GetDiodeName();
      var color = DiodeColourHelper.GetDiodeColorHexByName(name);
      var contrastColor = ColorMath.GetContrastColorHex(color);
      var textStyle = Object.assign({}, PanelStyleHelper.GetDiodeCellTextStyle(lightBarStyle), {'color': contrastColor});

      return (
        <div className={classes.diode} onClick={() => self.onClick()}>
          <Typography variant="body1" paragraph className={classes.text} style={textStyle}>
            <b>{name}</b>
          </Typography>
          <svg className={classes.svg} viewBox="0 0 30 30">
            <circle cx="15" cy="15" r="15" fill={color} />
          </svg>
        </div>
      );
    }

    private onClick() {
      if (typeof this.props.setCurrSelection === 'function')
      {
        this.props.setCurrSelection(this.props.index);

        if (this.props.isCustomising)
        {
          scroller.scrollTo('CustomLEDDesign', {
            duration: 1500,
            delay: 100,
            smooth: true,
            // containerId: 'CustomLEDDesignContainer',
            offset: -50,
          });
        }      
      } else {
        console.error('setCurrSelection function not available');
      }
    }

    private GetDiodeName(): string
    {
      var assignment = this.props.diodeSequence;
      if (assignment)
      {
        var index = this.props.index;
        if (index < assignment.length)
        {
          return assignment[this.props.index];
        }
      }

      return 'N/A';
    }
  }
)