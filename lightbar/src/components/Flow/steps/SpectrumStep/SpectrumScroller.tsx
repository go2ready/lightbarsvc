import * as React from 'react';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, WithStyles, createStyles  } from '@material-ui/core/styles';

import ScrollMenu from 'react-horizontal-scrolling-menu';

// One item component
// selected prop will be passed
const MenuItem = ({text, selected} : {text: string, selected: string}) => {
  return <div
    className={`menu-item ${selected ? 'active' : ''}`}
    >{text}</div>;
};

// All items component
// Important! add unique key
export const Menu = (list : any, selected : string) =>
  list.map((el : any) => {
    const {name} = el;
 
    return <MenuItem text={name} key={name} selected={selected} />;
  });

const Arrow = ({ text, className } : {text: string, className: string}) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};

const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

const styles = (theme: Theme) => createStyles({
  root: {
  },
});

export interface ISpectrumScrollerProps extends WithStyles<typeof styles> {
  diodeSequence?: string[];
  currSelection? : number;

  setCurrSelection?: (currSelection : number) => void;
}

export const SpectrumScroller = withStyles(styles)(
  class extends React.Component<ISpectrumScrollerProps>{

    constructor(props : ISpectrumScrollerProps) {
      super(props);

      this.onSelect = this.onSelect.bind(this);
    }

    public render() : JSX.Element {
      const { classes } = this.props;

      var selection = 0;
      if (this.props.currSelection)
      {
        selection = this.props.currSelection;
      }

      var list = this.GetList();
      var selected = list[selection]['name'];
      var menu = Menu(list, selected);
      return (
        <div className={classes.root}>
          <ScrollMenu
            data={menu}
            arrowLeft={ArrowLeft}
            arrowRight={ArrowRight}
            selected={selected}
            onSelect={this.onSelect}
            scrollToSelected={true}
            scrollBy={1}
          />
        </div>
      );
    }

    private onSelect(key: string | number | null) {
      if (key)
      {
        var index = String(key).slice(1);
        if (typeof this.props.setCurrSelection === 'function')
        {
          // cast to number
          this.props.setCurrSelection(+index - 1);
        } else {
          console.error('setCurrSelection function not available');
        }
      }
    }

    private GetList() {
      var list = [];

      var seq = this.props.diodeSequence;
      if (seq)
      {
        for(var i = 1; i <= seq.length; i ++)
        {
          list.push({'name': '#'+i});
        }
      }

      return list;
    }
  }
)