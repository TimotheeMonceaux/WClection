import { useState } from 'react';
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
import { AppStore } from '../redux/action-types';
import { isUserLoggedIn } from '../redux/selectors';
import AppCarousel from './carousel/Carousel';
import Collections from './products/Collections';
import Footer from './footer/Footer';
import SignupConfirm from './auth/signup/SignupConfirm';
import SignupSuccess from './auth/signup/SignupSuccess';

const useStyles = makeStyles((theme) => ({
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

const connectApp = connect(mapStoreToProps);


function App(props: ConnectedProps<typeof connectApp>) {
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
          <Container fixed style={{marginTop: 75}}>
            <AppCarousel />
            <Collections />
          </Container>
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default connectApp(App);
