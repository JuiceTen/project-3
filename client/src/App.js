import React, { useState } from 'react'
import './App.css';
import Nav from './components/Nav'
import Portfolio from './components/Portfolio'
import Three from './Utils/Three.js'
import AddAsset from './components/AddAsset'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Coin from './components/Rankings'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {LoginProvider, useLoginState, useLoginAction} from './Utils/loginState';

function App() {
  const [assets, setAssets] = useState([])
  const state = useLoginState()

  return (
    <Router>
      
      <Switch>
      <LoginProvider>
       <div className="App">
         {console.log(LoginProvider)}
      <Nav />
      <Route exact path ='/'>
      <Three></Three>
      </Route>
      <Route exact path = '/home'>
      <AddAsset/>
      </Route>
      
      <Route exact path = '/portfolio'>
      <Portfolio assets = {assets}/>
      </Route>

      <Route exact path = '/rankings'>
      <Coin/>
      </Route>

      <Route exact path = '/signup'>
        <SignUp/>
      </Route>

      <Route exact path ='/login'>
        <Login/>
      </Route>
    </div>
    </LoginProvider>
    </Switch>
    
    </Router>
  );
}

export default App;
