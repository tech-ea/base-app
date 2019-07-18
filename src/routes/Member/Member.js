import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import clsx from 'clsx';

import { makeStyles, styled } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// import Navigation from 'components/Navigation';

import {
  Dashboard as DashboardIcon,
  MonetizationOn as StoreIcon,
  AccountBox as AccountBoxIcon,
  Games as ProjectsIcon,
} from '@material-ui/icons';

import { withAuthorization } from 'api/Session';
import SceneHeader from 'components/SceneHeader';
// import SceneHeader from 'components/SceneHeader';

import LogOutListItem from 'components/LogOutListItem';

// import Dashboard from './Dashboard';
// import MemberAccount from 'screens/MemberAccount';
// import ProjectStore from 'screens/ProjectStore';
// import MemberProjects from 'screens/MemberProjects';
// import ProjectSpace from 'pages/ProjectSpace';
const drawerWidth = 240;

const MainBox = styled(Box)({
  display: 'flex',
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
});
// const DrawerHeader = styled(Box)({
//   display: 'flex',
//   alignItems: 'center',
//   padding: '0 8px',
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-end',
// });
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));
const Member = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  console.log(`props= ${props.location.pathname}`);
  return (
    <MainBox>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <SceneHeader path={props.location.pathname} />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key="dashboard" component={Link} to="/member">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </List>
        <Divider />

        <List>
          <ListItem button key="account" component={Link} to="/member/account">
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
          <ListItem button key="store" component={Link} to="/member/store">
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="Store" />
          </ListItem>
          <ListItem button key="games" component={Link} to="/member/projects">
            <ListItemIcon>
              <ProjectsIcon />
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItem>
        </List>

        <Divider />

        <List className={classes.onbottom}>{<LogOutListItem />}</List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

        <Switch>
          {/* <Route component={Members} path="/admin/members" /> */}
          {/* <Route path="/member/account" component={MemberAccount} />
          <Route path="/member/store" component={ProjectStore} />
          <Route path="/member/projects/:id" component={ProjectSpace} />
          <Route path="/member/projects" component={MemberProjects} />
          <Route path="/member" component={Dashboard} />
          <Route component={Dashboard} /> */}
          {/* <Route component={Error} /> */}
        </Switch>
      </main>
    </MainBox>
  );
};

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Member);
