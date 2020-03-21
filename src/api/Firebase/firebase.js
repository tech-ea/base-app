import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';
import 'firebase/performance';
import 'firebase/analytics';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
class Firebase {
  constructor() {
    app.initializeApp(config);

    /* Helper */

    this.fieldValue = app.firestore.FieldValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.dbase = app.database();
    this.fstore = app.firestore();
    this.funcs = app.functions();
    this.bucket = app.storage();
    this.perf = app.performance();
    this.analytics = app.analytics();
    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  // doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  // doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

  // doSignInWithTwitter = () => this.auth.signInWithPopup(this.twitterProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** FSTORE Merge Auth and DB User API *** //
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(async authUser => {
      if (authUser) {
        this.user(authUser.uid).onSnapshot(snapshot => {
          const userData = snapshot.data();

          // default empty roles
          if (!userData.roles) {
            userData.roles = {};
          }
          // merge auth and db user
          authUser = {
            uid: authUser.uid,
            email: authUser.email,
            emailVerified: authUser.emailVerified,
            providerData: authUser.providerData,
            ...userData,
          };
          this.analytics.setUserId(authUser.uid);
          console.log(`authUser=> ${authUser.uid}`);

          next(authUser);
        });
      } else {
        fallback();
      }
    });

  // *** RTDB Merge Auth and DB User API *** //
  // onAuthUserListener = (next, fallback) =>
  //   this.auth.onAuthStateChanged(authUser => {
  //     if (authUser) {
  //       this.user(authUser.uid)
  //         .once('value')
  //         .then(snapshot => {
  //           const dbUser = snapshot.val();

  //           // default empty roles
  //           if (!dbUser.roles) {
  //             dbUser.roles = [];
  //           }
  //           console.log(`dbUser=> ${JSON.stringify(dbUser)}`);

  //           // merge auth and db user
  //           authUser = {
  //             uid: authUser.uid,
  //             email: authUser.email,
  //             ...dbUser,
  //           };

  //           next(authUser);
  //         });
  //     } else {
  //       fallback();
  //     }
  //   });
  // *** User API ***
  // user = uid => this.db.ref(`users/${uid}`);
  // users = () => this.db.ref('users');
  // *** Firestore User API ***
  user = uid => this.fstore.doc(`users/${uid}`);
  users = () => this.fstore.collection('users');
  // *** FSTORE Merge Auth and DB User API *** //
  // onAuthUserListener = (next, fallback) =>
  //   this.auth.onAuthStateChanged(authUser => {
  //     if (authUser) {
  //       this.user(authUser.uid)
  //         .get()
  //         .then(snapshot => {
  //           const dbUser = snapshot.data();

  //           // default empty roles
  //           if (!dbUser.roles) {
  //             dbUser.roles = {};
  //           }
  //           // merge auth and db user
  //           authUser = {
  //             uid: authUser.uid,
  //             email: authUser.email,
  //             emailVerified: authUser.emailVerified,
  //             providerData: authUser.providerData,
  //             ...dbUser,
  //           };

  //           next(authUser);
  //         });
  //     } else {
  //       fallback();
  //     }
  //   });

  // *** Firestore User API *** //
  // user = uid => this.db.doc(`users/${uid}`);
  // users = () => this.db.collection('users');

  // *** Message API ***

  // message = uid => this.db.doc(`messages/${uid}`);
  // messages = () => this.db.collection('messages');
}

export default Firebase;
