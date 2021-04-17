import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import HeaderBar from './headerbar/Headerbar';
import LoginPage from './auth/login/LoginPage';
import SignupPage from './auth/signup/SignupPage';
import { AppStore, AppDispatch } from '../redux/action-types';
import Actions from '../redux/actions';
import { isUserLoggedIn } from '../redux/selectors';
import AppCarousel from './carousel/Carousel';
import Collections from './products/Collections';
import Footer from './footer/Footer';
import SignupConfirm from './auth/signup/SignupConfirm';
import SignupSuccess from './auth/signup/SignupSuccess';
import { Grid } from '@material-ui/core';

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
    top: '20vh',
    left: '10vw',
    width: '80vw',
    maxHeight: '60vh',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: theme.palette.error.main
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
  const [openModal, setOpenModal] = useState(props.globalAppError !== '');
  const classes = useStyles();

  return (
    <Router>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Paper className={classes.errorModal}>
          <Typography variant="h2">{props.globalAppError}</Typography>
          <Typography variant="h4">Press F5 to retry.</Typography>
        </Paper>
      </Modal>
      <HeaderBar />
      <div className={classes.body}>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
          <Route path="/checkout">
            {!props.isUserLoggedIn && <Redirect to="/login?callback=%2Fcheckout" />}
            <Typography variant="h3" style={{position: 'absolute', top: '25vh', left: '25vw'}}>Rends l'argent, Victor !</Typography>
          </Route>
          <Route path="/signupSuccess">
            <SignupSuccess />
          </Route>
          <Route path="/confirmEmail">
            <SignupConfirm />
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
