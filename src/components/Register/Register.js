import React, { useState, useContext } from 'react';
import {
  Typography,
  Paper,
  Avatar,
  Button,
  FormControlLabel,
  TextField,
  Checkbox,
  Grid,
  Link,
  FormHelperText,
} from '@material-ui/core';
import { Link as BtnLink, withRouter } from 'react-router-dom';
// import firebase from "api/firebase";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { withFirebase } from 'api/Firebase';

import ButtonMain from 'elements/ButtonMain';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  label: {
    fontSize: '.9rem',
  },
}));
const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

const Register = props => {
  const classes = useStyles();
  const [errors, setErrors] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkboxes, setCheckboxes] = useState({ isAdmin: false });
  //const firebase = useContext(FirebaseContext);
  // const onSubmit = e => {
  //   e.preventDefault();
  //   props.firebase
  //     .doCreateMemberWithEmailAndPassword(email, password)
  //     .then(user => {
  //       console.log(`${user}`);
  //     })
  //     .catch(errors => {
  //       setErrors(errors);
  //     });
  // };
  const handleChange = name => event => {
    setCheckboxes({ ...checkboxes, [name]: event.target.checked });
  };
  async function onRegister(e) {
    // const { username, email, passwordOne, isAdmin } = this.state;
    // const roles = {};
    e.preventDefault();

    try {
      await props.firebase
        .doCreateUserWithEmailAndPassword(email, password)
        .then(authUser => {
          // Create a user in your Firebase realtime database
          return props.firebase.user(authUser.user.uid).set({
            firstName,
            lastName,
            email,
            companyName,
          });
        })
        .then(() => {
          props.history.push('/member');
        })
        .catch(error => {
          if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
            error.message = ERROR_MSG_ACCOUNT_EXISTS;
          }
          setErrors(error);
        });

      // register(email, password);
      // await firebase.addQuote(quote);
    } catch (error) {
      setErrors(error);
      alert(error.message);
    }
  }
  // async function onRegister(e) {
  //   e.preventDefault();
  //   console.log(`props=${props.irebase}`);
  //   try {
  //     await props.firebase
  //       .register(email, password)
  //       .then(user => {
  //         props.history.replace("/dashboard");
  //       })
  //       .catch(errors => {
  //         setErrors(errors);
  //       });
  //     // register(email, password);
  //     // await firebase.addQuote(quote);
  //   } catch (error) {
  //     setErrors(error);
  //     alert(error.message);
  //   }
  // }

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form className={classes.form} noValidate onSubmit={onRegister}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="companyName"
              label="Company Name"
              name="companyName"
              autoComplete="companyName"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              className={classes.label}
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
          {errors && (
            <Grid item xs={12}>
              <FormHelperText id="component-error-text">
                {errors.message}
              </FormHelperText>
            </Grid>
          )}
        </Grid>
        <ButtonMain type="submit">REGISTER</ButtonMain>
        <Grid container justify="flex-end">
          <Grid item>
            <Link component={BtnLink} to="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
  // async function onRegister(e) {
  //   e.preventDefault();
  //   try {
  //     await firebase
  //       .doCreateMemberWithEmailAndPassword(email, password)
  //       .then(user => {
  //         props.history.replace("/dashboard");
  //       })
  //       .catch(errors => {
  //         setErrors(errors);
  //       });
  //     // register(email, password);
  //     // await firebase.addQuote(quote);
  //   } catch (error) {
  //     setErrors(error);
  //     alert(error.message);
  //   }
  // }
};

export default withRouter(withFirebase(Register));
