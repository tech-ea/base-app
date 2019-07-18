import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { DevicesOther } from '@material-ui/icons';
const useStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const ButtonMain = ({
  type = 'button',
  variant = 'contained',
  color = 'primary',
  handleClick,
  children,
  ...other
}) => {
  const classes = useStyles();
  return (
    <Button
      type={type}
      fullWidth
      variant={variant}
      color={color}
      className={classes.submit}
      onClick={handleClick}
      {...other}
    >
      {children}
    </Button>
  );
};

export default ButtonMain;
