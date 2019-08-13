import * as React from 'react';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, WithStyles, makeStyles, createStyles } from '@material-ui/core/styles';
import { amber, green } from '@material-ui/core/colors';

import clsx from 'clsx';

import { TransitionProps } from '@material-ui/core/transitions/transition';
import { NotificationType } from '../../types/NotificationStoreState';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import Slide from '@material-ui/core/Slide';
import transitions from '@material-ui/core/styles/transitions';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

interface MySnackbarContentWrapperProps {
  className?: string,
  message?: string,
  onClose?: () => void,
  variant: 'error' | 'info' | 'success' | 'warning',
};

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide ref={ref} {...props} direction="down" />;
});

const MySnackbarContentWrapper = React.forwardRef((props : MySnackbarContentWrapperProps, ref) =>{
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      ref={ref}
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
})

const styles = (theme: Theme) => createStyles({
  close: {
    width: theme.spacing(1),
    height: theme.spacing(1),
    padding: 0,
  },
  margin: {
    margin: theme.spacing(1),
  },
});

export interface INotificationHelperProps extends WithStyles<typeof styles> {
  message?: string, 
  shouldShow?: boolean,
  actionId?: string,
  autoHideTimer?: number,
  type?: NotificationType,

  setShouldShow?: (shouldShow: boolean, message: string, autoHideTimer?: number, type?: NotificationType) => void,
};

// TODO: maximum message, message type etc
export const NotificationHelper = withStyles(styles)(
  class extends React.Component<INotificationHelperProps>{

    public MaximumLength: number = 30;

    constructor(props : INotificationHelperProps) {
      super(props);

      this.onClose = this.onClose.bind(this);
    }

    public onClose() : void {
      if (typeof this.props.setShouldShow === 'function') {
        this.props.setShouldShow(false, "");
      } else {
        console.error('setShouldShow function not available');
      }
    }

    public render() : JSX.Element {
      const { classes, shouldShow, message, autoHideTimer, type } = this.props;

      return (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.undefineAsFasle(shouldShow)}
          autoHideDuration={(autoHideTimer === undefined || autoHideTimer === 0) ? undefined : autoHideTimer}
          onClose={this.onClose}
          TransitionComponent={Transition}
        >
          <MySnackbarContentWrapper
            variant={type === undefined ? 'info' : type}
            className={classes.margin}
            message={this.shortenMessageInRange(message)}
            onClose={this.onClose}
          />
        </Snackbar>
      )
    }

    private shortenMessageInRange(message: string | undefined) : string | undefined {
      if (message && message.length > this.MaximumLength)
      {
        return message.slice(0, this.MaximumLength - 3) + '...';
      }

      return message;
    }

    private undefineAsFasle(value: boolean | undefined) {
      return value === undefined ? false : value;
    }
  }
);