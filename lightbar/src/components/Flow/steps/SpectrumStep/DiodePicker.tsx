import * as React from 'react';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, WithStyles, createStyles  } from '@material-ui/core/styles';

import { DiodeColourHelper } from '../../../Preview/helpers/DiodeColourHelper';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import update from 'immutability-helper';

const styles = (theme: Theme) => createStyles({
  root: {
  },
});

export interface IDiodePickerProps extends WithStyles<typeof styles> {
  diodeSequence?: string[];
  currSelection?: number;

  setDiodeSequence?: (diodeSequence: string[]) => void;
}

export const DiodePicker = withStyles(styles)(
  class extends React.Component<IDiodePickerProps>{

    constructor(props : IDiodePickerProps) {
      super(props);

      this.HandleChange = this.HandleChange.bind(this);
    }

    public render() : JSX.Element {
      const { classes, diodeSequence, currSelection } = this.props;

      var self = this;

      var selection = 'N/A';
      if (diodeSequence !== undefined && currSelection !== undefined)
      {
        selection = diodeSequence[currSelection];
      }
      return (
        <div className={classes.root}>
          <FormControl component="fieldset">
            <FormLabel>Select the LED using the scroller or choose it from preview</FormLabel>
            <RadioGroup aria-label="position" name="position" value={selection} onChange={self.HandleChange} row>
              {self.CreateRadioSelection()}
            </RadioGroup>
          </FormControl>
        </div>
      );
    }

    private HandleChange(event: React.ChangeEvent<{}>, value: string) {
      const { diodeSequence, currSelection } = this.props;

      if (diodeSequence !== undefined && currSelection !== undefined)
      {
        const seq = update(diodeSequence, {[currSelection]: {$set: value}});

        if (typeof this.props.setDiodeSequence === 'function')
        {
          this.props.setDiodeSequence(seq);
        } else {
          console.error('setDiodeSequence function not available');
        }
      }
    }

    private CreateRadioSelection()
    {
      var selections : React.ReactNode[] = [];
      // first: diode name, sec: colour
      var colors = DiodeColourHelper.DiodeMap;
      colors.forEach((color: string, name: string) => {
        selections.push(
        <FormControlLabel
          key={'picker'+name}
          value={name}
          control={<Radio style={{color: color}} />}
          label={name}
          labelPlacement="top"
        />);
      });
      return selections;
    }
  }
)