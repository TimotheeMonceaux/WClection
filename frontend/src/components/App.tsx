import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import HeaderBar from './headerbar/headerbar';
import LoginPage from './auth/login/LoginPage';
import SignupPage from './auth/signup/SignupPage';
import { AppStore } from '../redux/action-types';

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
          <h1 className="App">Hello, World!</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default connectApp(App);
