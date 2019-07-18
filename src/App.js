import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
// Material helpers
import { ThemeProvider } from '@material-ui/styles';
import { theme } from 'styles';
import { withAuthentication } from 'api/Session';

import * as PATHS from 'routes/paths';
import { Landing, Member } from 'routes';

const App = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <CssBaseline />
      <Switch>
        <Route path={PATHS.MEMBER} component={Member} />
        <Route path={PATHS.LANDING} component={Landing} />
        {/* <Route component={Error} /> */}
      </Switch>
    </BrowserRouter>
  </ThemeProvider>
);
export default withAuthentication(App);
