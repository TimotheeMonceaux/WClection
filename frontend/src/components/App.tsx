import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginForm from './auth/LoginForm';
import './App.css';
import UserCard from './auth/UserCard';
function App() {
  return (
    <Router>
      <UserCard />
      <Switch>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/">
          <h1 className="App">Hello, World!</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
