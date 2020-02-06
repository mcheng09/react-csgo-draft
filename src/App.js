import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Layout from './hoc/Layout/Layout';
import HomePage from './pages/Home/Home';
import PlayersPage from './pages/Players/Players'
import TeamsPage from './pages/Teams/Teams'
import ContactPage from './pages/Contact/Contact'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
            <Switch>
              <Route path='/players' component={PlayersPage} />
              <Route path='/teams' component={TeamsPage} />
              <Route path='/contact' component={ContactPage} />
              <Route path='/' component={HomePage} />
            </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
