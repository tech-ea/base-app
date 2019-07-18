import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
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
    >
      {children}
    </Button>
  );
};

export default ButtonMain;
