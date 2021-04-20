import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import Container from '@material-ui/core/Container';
import CancelOutlined from '@material-ui/icons/CancelOutlined';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import HeaderBar from './headerbar/Headerbar';
import LoginPage from './auth/login/LoginPage';
import SignupPage from './auth/signup/SignupPage';
import ForgotPasswordPage from './auth/forgotpassword/ForgotPasswordPage';
import { AppStore, AppDispatch } from '../redux/action-types';
import Actions from '../redux/actions';
import { isUserLoggedIn } from '../redux/selectors';
import AppCarousel from './carousel/Carousel';
import Collections from './products/Collections';
import Footer from './footer/Footer';
import SignupConfirm from './auth/signup/SignupConfirm';
import SignupSuccess from './auth/signup/SignupSuccess';
import ForgotPasswordSuccess from './auth/forgotpassword/ForgotPasswordSuccess';
import ResetPasswordPage from './auth/resetpassword/ResetPasswordPage';
import ResetPasswordSuccess from './auth/resetpassword/ResetPasswordSuccess';


const useStyles = makeStyles((theme) => ({
  body: {
    paddingTop: 75,
    minHeight: 'calc(100vh - 75px)',
    display: 'flex',
    flexDirection: 'column'
  },
  footer: {
    marginTop: 'auto',
    width: '100%'
  },
  errorModal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60vw',
    height: '60vh',
    zIndex: 10,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(10),
    color: theme.palette.error.main
  },
  errorIcon: {
    position: 'relative',
    top: 5,
    marginRight: theme.spacing(2)
  },
  errorLine: {
    marginTop: theme.spacing(3)
  }
}));

function mapStoreToProps(store: AppStore) {
  return {
      globalAppError: store.globalAppError,
      isUserLoggedIn: isUserLoggedIn(store)
  }
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return {
    getSession: () => {dispatch(Actions.getSession())}
  }
}

const connectApp = connect(mapStoreToProps, mapDispatchToProps);


function App(props: ConnectedProps<typeof connectApp>) {
  const getSession = props.getSession;
  useEffect(() => {getSession()}, [getSession]);
  const classes = useStyles();

  return (
    <Router>
        {props.globalAppError !== '' && <Paper className={classes.errorModal}>
          <Typography variant="h3" className={classes.errorLine}><CancelOutlined fontSize="inherit" className={classes.errorIcon}/>Error</Typography>
          <Typography variant="h4" className={classes.errorLine}>{props.globalAppError}</Typography>
          <Typography variant="h5" className={classes.errorLine}>Press F5 to retry.</Typography>
        </Paper>}
      <HeaderBar />
      <div className={classes.body}>
        <Switch>
          <Route path="/login"><LoginPage /></Route>
          <Route path="/signup"><SignupPage /></Route>
          <Route path="/forgotPassword"><ForgotPasswordPage /></Route>
          <Route path="/signupSuccess"><SignupSuccess /></Route>
          <Route path="/confirmEmail"><SignupConfirm /></Route>
          <Route path="/forgotPasswordSuccess"><ForgotPasswordSuccess /></Route>
          <Route path="/resetPassword"><ResetPasswordPage /></Route>
          <Route path="/resetPasswordSuccess"><ResetPasswordSuccess /></Route>
          <Route path="/checkout">
            {!props.isUserLoggedIn && <Redirect to="/login?callback=%2Fcheckout" />}
            <Typography variant="h3" style={{position: 'absolute', top: '25vh', left: '25vw'}}>Rends l'argent, Victor !</Typography>
          </Route>
          <Route path="/">
            <Container fixed>
              <AppCarousel />
              <Collections />
            </Container>
          </Route>
        </Switch>
        <Grid container className={classes.footer}>
          <Footer />
        </Grid>
      </div>
    </Router>
  );
}

export default connectApp(App);
