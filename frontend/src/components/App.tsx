import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginButton from './auth/LoginButton';
import LoginForm from './auth/LoginForm';
import './App.css';
function App() {
  return (
    <Router>
      <h1 className="App">Hello, World!</h1>
      <Switch>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/">
          <LoginButton />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
