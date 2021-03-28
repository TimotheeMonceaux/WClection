import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import HeaderBar from './headerbar/Headerbar';
import LoginPage from './auth/login/LoginPage';
import SignupPage from './auth/signup/SignupPage';
import { AppStore } from '../redux/action-types';
import AppCarousel from './carousel/Carousel';
import { Container } from '@material-ui/core';
import Collection from './products/Collection';

function mapStoreToProps(store: AppStore) {
  return {
      globalAppError: store.globalAppError,
  }
}

const connectApp = connect(mapStoreToProps);


function App(props: ConnectedProps<typeof connectApp>) {
  return (
    <Router>
      {props.globalAppError && <Redirect to="/error" />}
      <HeaderBar />
      <Switch>
        <Route path="/error">
          <h1>{`ERROR: ${props.globalAppError}`}</h1>
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/">
          <Container fixed>
            <AppCarousel />
            <Collection />
          </Container>
        </Route>
      </Switch>
    </Router>
  );
}

export default connectApp(App);
