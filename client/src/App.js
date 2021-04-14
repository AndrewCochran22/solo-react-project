import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Posts from './pages/Posts'
import Navigation from './components/Navigation';
import Register from './pages/Register';
import Login from './pages/Login';
import Calendar from './pages/Calendar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
      </div>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/posts">
          <Posts />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/calendar">
          <Calendar />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
