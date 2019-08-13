import * as React from 'react';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, WithStyles, createStyles  } from '@material-ui/core/styles';

import { LightBarStyle } from '../../types/FlowState';
import { DiodeContainer } from './containers/DiodeContainer';
import { PanelStyleHelper } from './helpers/PanelStyleHelper';

import light60 from './rsw/saber60.svg';
import light90 from './rsw/saber90.svg';
import light120 from './rsw/saber120.svg';

const styles = (theme: Theme) => createStyles({
  root: {
    // display: 'flex',
    flexWrap: 'wrap',
    // justifyContent: 'space-around',
    // overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper,
    overflowX: 'auto',
    position: 'relative',
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  bgImage: {
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 0,
  },
  diodeContainer: {
    position: 'relative',
    zIndex: 15,
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  diodeth: {
    margin: 0,
  },
  panel: {
    textAlign: 'center',
    width: 'auto',
  },
});

export interface IPreviewPanelProps extends WithStyles<typeof styles> {
  lightBarStyle? : LightBarStyle
}

export const PreviewPanel = withStyles(styles)(
  class extends React.Component<IPreviewPanelProps>{
    public render() : JSX.Element {
      const { classes } = this.props;

      var lightbarsvg = '';
      if (this.props.lightBarStyle === LightBarStyle.Sixty)
      {
        lightbarsvg = light60;
      }
      else if (this.props.lightBarStyle === LightBarStyle.Ninety)
      {
        lightbarsvg = light90;
      }
      else if (this.props.lightBarStyle === LightBarStyle.OneTwety)
      {
        lightbarsvg = light120;
      }

      var panelStyle = PanelStyleHelper.GetPanelStyle(this.props.lightBarStyle);
      var bgStyle = PanelStyleHelper.GetBgStyle(this.props.lightBarStyle);

      var diodeContainerStyle = PanelStyleHelper.GetDiodeContainerStyle(this.props.lightBarStyle);
      var diodeTextContainerStyle = PanelStyleHelper.GetDiodeTextContainerStyle(this.props.lightBarStyle);
      return (
        <div className={classes.root} style={panelStyle}>
          <div className={classes.panel}>
            <img className={classes.bgImage} src={lightbarsvg} alt={'Saber light'} style={bgStyle} />
            <table className={classes.diodeContainer} style={diodeContainerStyle} >
              <tbody>
                <tr>
                  {this.generateDiode()}
                </tr>
              </tbody>
            </table>
            <table className={classes.diodeContainer} style={diodeTextContainerStyle} >
              <tbody>
                <tr>
                  {this.generateDiodeText()}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    private generateDiode() {
      var cellStyle = PanelStyleHelper.GetDiodeCellStyle(this.props.lightBarStyle);
      var cellNumber = this.getCellNumber();

      let diodeSequence = [];
      for (let i = 0; i < cellNumber; i++)
      {
        diodeSequence.push(<th key={i} className={this.props.classes.diodeth} style={cellStyle}><DiodeContainer index={i}/></th>);
      }

      return diodeSequence;
    }

    private generateDiodeText() {
      var cellStyle = PanelStyleHelper.GetDiodeTextCellStyle(this.props.lightBarStyle);
      var cellNumber = this.getCellNumber();

      let diodeSequence = [];
      for (let i = 1; i <= cellNumber; i++)
      {
        diodeSequence.push(<th key={i + 'text'} className={this.props.classes.diodeth} style={cellStyle}>#{i}</th>);
      }

      return diodeSequence;
    }

    private getCellNumber() {
      switch(this.props.lightBarStyle)
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
  }
)