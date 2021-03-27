import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import UserCard from './auth/UserCard';
import LoginForm from './auth/LoginForm';
import SignupForm from './auth/SignupForm';
import { AppStore } from '../redux/action-types';
import './App.css';

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
      <UserCard />
      <Switch>
        <Route path="/error">
          <h1>{`ERROR: ${props.globalAppError}`}</h1>
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/signup">
          <SignupForm />
        </Route>
        <Route path="/">
          <h1 className="App">Hello, World!</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default connectApp(App);
