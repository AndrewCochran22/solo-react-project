import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Posts from './pages/Posts'
import Navigation from './components/Navigation';

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
          
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
