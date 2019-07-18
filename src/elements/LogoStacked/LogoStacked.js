import React from 'react';
import { styled } from '@material-ui/styles';
import { ReactComponent as EALogo } from 'assets/logos/ea-logo01.svg';

const LogoWrap = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& svg': {
    width: '100%',
    height: '100%',
    maxWidth: '500px',
  },
});

const LogoStacked = () => {
  return (
    <LogoWrap>
      <EALogo />
    </LogoWrap>
  );
};

LogoStacked.propTypes = {};

export default LogoStacked;
