import * as React from 'react';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, WithStyles, createStyles  } from '@material-ui/core/styles';

import { LightBarStyle } from '../../../../types/FlowState';
import { PresetHelper } from '../../helpers/PresetHelper';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const styles = (theme: Theme) => createStyles({
  root: {
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    verticalAlign: 'center',
  },
  button: {
    margin: theme.spacing(1),
  },
});

export interface IPresetPickerProps extends WithStyles<typeof styles> {
  lightBarStyle?: LightBarStyle;
  shouldResetSpectrum?: boolean;

  setDiodeSequence?: (diodeSequence: string[]) => void;
  setShouldResetSpectrum?: (shouldResetSpectrum: boolean) => void;
}

export interface IPresetPickerState {
  selected: string;
}

export const PresetPicker = withStyles(styles)(
  class extends React.Component<IPresetPickerProps, IPresetPickerState>{

    constructor(props : IPresetPickerProps) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
      this.onClick = this.onClick.bind(this);

      this.state = {
        selected: 'None'
      };
    }

    public render() : JSX.Element {
      const { classes } = this.props;

      this.checkResetRequest();

      return (
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel shrink htmlFor="preset-native-label-placeholder">
              Preset Spectrum
            </InputLabel>
            <NativeSelect
              value={this.state.selected}
              onChange={this.handleChange}
              input={<Input name="preset" id="preset-native-label-placeholder" />}
            >
              {this.GetPresetOptions()}
            </NativeSelect>
            <FormHelperText>
              Select from professionally designed layout
            </FormHelperText>
          </FormControl>
          <Button onClick={this.onClick} variant="outlined" color="primary" className={classes.button}>
            Apply
          </Button>
        </div> 
      );
    }

    private checkResetRequest() {
      if (this.props.shouldResetSpectrum)
      {
        this.onClick();

        if (typeof this.props.setShouldResetSpectrum === 'function')
        {
          this.props.setShouldResetSpectrum(false);
        } else {
          console.error('setDiodeSequence function not available');
        }
      }
    }

    private onClick() {
      var rightMap = this.GetSpectrumMap();
      var seq = rightMap.get(this.state.selected);

      if (typeof this.props.setDiodeSequence === 'function')
      {
        if (!seq)
        {
          this.props.setDiodeSequence(this.GetNADiodeMap());
          return;
        }

        this.props.setDiodeSequence(seq);
      } else {
        console.error('setDiodeSequence function not available');
      }
    }

    private handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
      this.setState({
        ...this.state,
        selected: event.target.value,
      });
    }

    private GetPresetOptions() {
      var rightMap = this.GetSpectrumMap();

      var options : JSX.Element[] = [];
      options.push(<option key={'optionNone'} value={'None'}>{'None'}</option>);
      rightMap.forEach((value: string[], key: string) => {
        options.push(<option key={'option' + key} value={key}>{key}</option>);
      });

      return options;
    }

    private GetSpectrumMap() {
      var lightBarStyle = this.props.lightBarStyle;
      var rightMap = new Map<string, string[]>();
      switch(lightBarStyle)
      {
        case LightBarStyle.Sixty:
          rightMap = PresetHelper.PresetMap600;
          break;
        case LightBarStyle.Ninety:
          rightMap = PresetHelper.PresetMap900;
          break;
        case LightBarStyle.OneTwety:
          rightMap = PresetHelper.PresetMap1200;
          break;
      }

      return rightMap;
    }

    private GetNADiodeMap() {
      var diodeCount = 18;
      var lightBarStyle = this.props.lightBarStyle;
      switch(lightBarStyle)
      {
        case LightBarStyle.Sixty:
          diodeCount = 18;
          break;
        case LightBarStyle.Ninety:
          diodeCount = 24;
          break;
        case LightBarStyle.OneTwety:
          diodeCount = 36;
          break;
      }

      var diodes = [];
      for (var i = 0; i < diodeCount; i++)
      {
        diodes.push('N/A');
      }

      return diodes;
    }
  }
)