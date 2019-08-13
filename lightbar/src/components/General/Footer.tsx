import * as React from 'react';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, WithStyles, createStyles  } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';

const styles = (theme: Theme) => createStyles({
  root: {
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: 'white',
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  clickable: {
    cursor: 'pointer',
  }
});

export interface IFooterProps extends WithStyles<typeof styles> {
  flowStage?: number
}

export interface IFooterState {
  helpOpen: boolean;
}

export const Footer = withStyles(styles)(
  class extends React.Component<IFooterProps, IFooterState>{
    constructor(props : IFooterProps) {
      super(props);

      this.state = {
        helpOpen: false,
      }

      this.onImportHelpClick = this.onImportHelpClick.bind(this);;
      this.OnImportHelpDismissed = this.OnImportHelpDismissed.bind(this);
    }

    public render() : JSX.Element {
      const { classes, flowStage } = this.props;
      const { helpOpen } = this.state;

      var self = this;

      var notationContent = this.getNotationBasedonFlowStage(flowStage);

      return (
        <div>
          <footer className={classes.footer}>
            <Container maxWidth="sm">
              {notationContent}
              <Divider variant="middle" className={classes.divider} />
              <Typography variant="body1">Saber LED Light bar designer</Typography>
              <Typography variant="body2" color="textSecondary">
                {'Developed by '}
                <Link color="inherit" href="https://material-ui.com/">
                  Coralution Technology Ltd.
                </Link>
                {'© All rights reserved.'}
              </Typography>
            </Container>
          </footer>
          <Dialog
            open={helpOpen}
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

    private getNotationBasedonFlowStage(flowstage: number | undefined)
    {
      if (flowstage === 1)
      {
        return <div>
          <Typography 
            variant="caption"
            className={this.props.classes.clickable}
            onClick={this.onImportHelpClick}>* Your customised order will be shipped from <u>outside the country, click for more info</u></Typography>
          <br/>
          <Typography variant="caption" >** It is not possible to mathmatically deduct real spectrum with 100% accuracy, the one that is showing is for reference only.</Typography>
        </div>;
      }
    }

    private onImportHelpClick()
    {
      this.setState({
        ...this.state,
        helpOpen: true,
      });
    }

    private OnImportHelpDismissed()
    {
      this.setState({
        ...this.state,
        helpOpen: false,
      });
    }
  }
)