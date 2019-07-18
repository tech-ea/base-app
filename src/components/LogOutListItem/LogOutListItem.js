import React from 'react';
import { withFirebase } from 'api/Firebase';
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const LogOutListItem = ({ firebase }) => (
  <ListItem button key="logout" onClick={firebase.doSignOut}>
    <ListItemIcon>
      <ExitToAppIcon />
    </ListItemIcon>
    <ListItemText primary="Log Out" />
  </ListItem>
);

export default withFirebase(LogOutListItem);
