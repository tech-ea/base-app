import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { styled } from '@material-ui/styles';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LogoStacked from 'elements/LogoStacked';
import Login from 'components/Login';
import Register from 'components/Register';
import * as PATHS from 'routes/paths';
const MainContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  height: '100vh',
});

export default function Landing() {
  return (
    <MainContainer>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="stretch"
      >
        <Grid item xs={false} sm={4} md={7}>
          <LogoStacked />
        </Grid>
        <Grid item xs={12} sm={8} md={5}>
          <Switch>
            {/* <Route component={Members} path="/admin/members" /> */}
            <Route component={Register} path={PATHS.REGISTER} />
            <Route component={Login} />
            {/* <Route component={Error} /> */}
          </Switch>
        </Grid>
      </Grid>
    </MainContainer>
  );
}
