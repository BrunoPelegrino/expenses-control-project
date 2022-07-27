import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends React.Component {
  render() {
    return (
      <div className="app-root">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/carteira" component={ Wallet } />
      </Switch>
      </div>
    );
  }
}

export default App;
